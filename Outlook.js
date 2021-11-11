integration.define({
  synchronizations: [
    {
      name: "Outlook",
      fullSyncFunction: fullSync,
    },
  ],
  model: {
    tables: [
      {
        name: "user",
        columns: [
          {
            name: "id",
            type: "STRING",
            length: 255,
            primaryKey: true,
          },
          {
            name: "mail",
            type: "STRING",
            length: 255,
          },
        ],
      },
      {
        name: "calendar_view",
        columns: [
          {
            name: "id",
            type: "STRING",
            length: 255,
            primaryKey: true,
          },
          {
            name: "subject",
            type: "STRING",
            length: 255,
          },
          {
            name: "mail",
            type: "STRING",
            length: 255,
          },
        ],
      },
    ],
  },
});

const moment = library.load("moment-timezone");

const startDate = moment.utc().subtract(1, "d").format();
const endDate = moment.utc().add(30, "d").format();

async function fullSync({ client, dataStore }) {
  console.log(`inside function`);
  const userRequest = await client.fetch(`/v1.0/users?$top=5`);
  if (!userRequest.ok) {
    throw new Error(
      `Users sync failed ${userRequest.status}:${userRequest.statusText}.`
    );
  }
  const userResponse = await userRequest.json();

  userResponse.value.map(async (value) => {
    const calendarViewRequest = await client.fetch(
      `/v1.0/users/${value.id}/calendarView?startdatetime=${startDate}&enddatetime=${endDate}&$top=100`
    );
    if (!calendarViewRequest.ok) {
      throw new Error(
        `Users sync failed ${calendarViewRequest.status}:${calendarViewRequest.statusText}.`
      );
    }
    const calendarViewResponse = await calendarViewRequest.json();

    calendarViewResponse.value.map((calendarValue) => {
      dataStore.save("calendar_view", {
        id: calendarValue.id,
        subject: calendarValue.subject,
        mail: value.mail,
      });
    });

    dataStore.save("user", value);
  });

  // Users pagination
  let nextPage = userResponse["@odata.nextLink"];
  while (nextPage) {
    const userRequestPagination = await client.fetch(
      `/v1.0/users?${nextPage.split(`?`)[1]}`
    );
    if (!userRequestPagination.ok) {
      throw new Error(
        `Users sync failed ${userRequestPagination.status}:${userRequestPagination.statusText}.`
      );
    }
    const userResponsePagination = await userRequestPagination.json();

    userResponsePagination.value.map(async (value) => {
            const calendarViewRequest = await client.fetch(
        `/v1.0/users/${value.id}/calendarView?startdatetime=${startDate}&enddatetime=${endDate}&$top=100`
      );
      if (!calendarViewRequest.ok) {
        throw new Error(
          `Users sync failed ${calendarViewRequest.status}:${calendarViewRequest.statusText}.`
        );
      }
      const calendarViewResponse = await calendarViewRequest.json();

      calendarViewResponse.value.map((calendarValue) => {
        dataStore.save("calendar_view", {
          id: calendarValue.id,
          subject: calendarValue.subject,
          mail: value.mail,
        });
      });

      dataStore.save("user", value);
    });

    nextPage = userResponsePagination["@odata.nextLink"];
  }
}
