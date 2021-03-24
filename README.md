---
layout: doc
---

# Integrate Blackboard

Deploy the Blackboard integration to register for a new course, view the course and its related details as a Student and create a course announcement, view the course members and grades as Instructor.
  
For comprehensive details about the microapps, see the section below.

## Review prerequisites

After you set up this integration with Blackboard, you will need these artifacts to add the integration in Citrix Workspace Microapps:

* BASE URL: https://blackboard.{{domain_name}}.com
* AUTHORIZATION URL: https://blackboard.{{domain_name}}.com/learn/api/public/v1/oauth2/authorizationcode
* TOKEN URL: https://blackboard.{{domain_name}}.com/learn/api/public/v1/oauth2/token
* CLIENT ID: The client ID is the string representing client registration information unique to the authorization server.
* SECRET: The client secret is a unique string issued when setting up the target application integration.

>**Note:**
>
>It is recommended that you always use OAuth 2.0 as your service authentication method where available. OAuth 2.0 ensures that your integration meets the maximum security compliance with your configured microapp.

Configure Citrix Gateway to support single sign-on for Blackboard so that once users log in they are automatically logged in again without having to enter their credentials a second time. For more information about configuring SSO, see Citrix Gateway Service https://docs.citrix.com/en-us/citrix-gateway-service/.

The integration requires regular access to your Blackboard instance, so we recommend creating a dedicated user account. This account must have the following permissions:

*  Permissions required for Service Account: Full administrator privileges

The number of API requests that can be made to specific resources is limited, we therefore recommend the following:

*  API Limit: https://docs.blackboard.com/learn/rest/admin/groups-quotas-rates

## Set up the Blackboard integration

### Enable APIs
Blackboard APIs are enabled by default, we need either Blackboard **Developer AMI** or Blackboard **Partner Account** to access the APIs.

### Create a New Service Account
It is recommended to have a Blackboard Partner account: https://docs.blackboard.com/partners/become-a-partner

### Configure OAuth server

Configure the OAuth server to read data through the Blackboard integration.

1. Sign up to https://developer.blackboard.com/
2. Select **My Apps** and **Create a New App**
3. Complete the required fields and click **Register application and generate API key**
4. Copy and save the **Application ID**, **Application Key** and **Secret** shown on the screen. You use these details for Service Authentication         while configuring the integration.
5. Login to Blackboard application as a **Administrator**.
6. Navigate to **System Admin**.
7. Select **REST API Integrations** under **Integrations** table.
8. Select **Create Integration**.
9. Complete the required fields
    a. Paste the **Application ID** which is received in the step 4.
    b. Type the administrator username in the **Learn User** textbox.
    c. Select **Yes** for **End User Access** and **Authorized To Act As User**.

### Configure OAuth client

Configure the OAuth client to  writing back data through the Blackboard integration.

1. Sign up to https://developer.blackboard.com/
2. Select **My Apps** and **Create a New App**
3. Complete the required fields and click **Register application and generate API key**
4. Copy and save the **Application ID**, **Application Key** and **Secret** shown on the screen. You use these details for Service Authentication         while configuring the integration.
5. Login to Blackboard application as a **Administrator**.
6. Navigate to **System Admin**.
7. Select **REST API Integrations** under **Integrations** table.
8. Select **Create Integration**.
9. Complete the required fields
    a. Paste the **Application ID** which is received in the step 4.
    b. Type the administrator username in the **Learn User** textbox.
    c. Select **Yes** for **End User Access** and **Authorized To Act As User**.

### Add the integration to Citrix Workspace Microapps

Add the Blackboard integration to Citrix Workspace Microapps to connect to your application. This delivers out-of-the-box microapps with pre-configured notifications and actions which are ready to use within your Workspace.

**Follow these steps:**

1.  From the **Microapp Integrations** page, select **Add New Integration**, and **Add a new integration from Citrix-provided templates**.
2.  Choose the Blackboard tile.
3.  Enter a name for the integration.
4.	Enter **Connector parameters**.
		> Enter the instance **Base URL:** https://blackboard.{{domain_name}}.com 
		> Select an Icon for the integration from the Icon Library, or leave this as the default icon.
		// INSERT IMAGE//
5.	Under **Service authentication**, select **OAuth 2.0** from the **Authentication method** menu and complete the authentication details. The authentication options are preselected. Ensure that these options are selected as you complete the process. Use the OAuth 2.0 security protocol to generate request/authorization tokens for delegated access. It is recommended that you always use OAuth 2.0 as your service authentication method where available. OAuth 2.0 ensures that your integration meets the maximum security compliance with your configured microapp.
		a. Select **Client credentials** from the **Grant type** menu.
		b. Select **Authorization Header** from the **Token authorization** menu.
		c. The **Token URL** is prefilled: https://blackboard.{{domain_name}}.com/learn/api/public/v1/oauth2/token
		d. Ensure the following is entered for Scope:** read **
		e. Enter your **Client ID**. The client ID is the string representing client registration information unique to the authorization server. You collect this as **Application Key** when you configure the OAuth server.
		f. Enter your **Client secret**. The client secret is a unique string issued when setting up the target application integration. You collect this as **Secret** when you configure the OAuth server.
		// INSERT IMAGE//
6.	Under **Service Action Authentication**, enable the **Use Separate User Authentication** in Actions toggle. Service action authentication authenticates at the service action level. The authentication options are preselected. Ensure that these options are selected as you complete the process.
		a. Select **OAuth 2.0** from the **Authentication method** menu and complete the authentication details.
		b. Select **Authorization Header** from the **Token authorization** menu.
		c. The **Authorization URL** is prefilled: https://blackboard.{{domain_name}}.com/learn/api/public/v1/oauth2/authorizationcode
		d. The **Token URL** is prefilled: https://blackboard.{{domain_name}}.com/learn/api/public/v1/oauth2/token
		e. Ensure the following is entered for Scope:** write **
		f. Enter your **Client ID**. The client ID is the string representing client registration information unique to the authorization server. You collect this as **Application Key** when you configure the OAuth client.
		g. Enter your **Client secret**. The client secret is a unique string issued when setting up the target application integration. You collect this as **Secret** when you configure the OAuth client.
		// INSERT IMAGE//
7.	Enable the **Enable request rate limiting** toggle. Enter 60 for **Number of requests** and 1 second for **Time interval**.
		// INSERT IMAGE //
8.	(Optional) Enable **Logging** toggle to keep 24 hours of logging for support purposes.
9.	Select **Save** to proceed.


The **Microapp Integrations** page opens with your added integration and its microapps. From here you can add another integration, continue setting up your out-of-the-box microapps, or create a new microapp for this integration.

You are now ready to set and run your first data synchronization. As a large quantity of data can be pulled from your integrated application to the Microapps platform, we recommend you use the **Table** page to filter entities for your first data synchronization to speed up synchronization.

For more information, see [Verify needed entities](/en-us/citrix-microapps/set-up-template-integrations.html#verify-needed-entities) and [Set data synchronization](/en-us/citrix-microapps/set-up-template-integrations.html#set-data-synchronization) in the Configure the integration article.

>**Note:**
> Update the url in **View on Blackboard** button of My Grades page in My Grades microapp.   
> Blackboard supports pagination type “Offset”, due to this extra API calls are triggered in all the endpoints where we have implemented pagination.   
> Blackboard developer server supports only 10000 API calls/Site/24hours  
> Blackboard production server supports Up to 75000 API calls/Site/24hours  
> Retained only Course Memberships and Course Announcements as part of incremental sync, due to API call limit; remaining endpoints will be triggered as part of full synchronization  
>Data type of below columns should be changed  

|Table|Column|Data type|
|:-----------|:-----------|:---------|
|Course Announcements|Body|Binary|
|User Grades|Display Score|Double|
|Grade Score|Score Possible|Double|


## Use Blackboard microapps

Existing application integrations come with out-of-the-box microapps. Start with these microapps and customize them for your needs.

  
**Course Registration:** Microapp is used to register for a course.

|Notification or Page|Use-case workflows|
|:-------------|:-------------|
| New Course Registration notification | When a student enrolled for a course, enrolled student receives a notification.  |
| Course Registration Detail page | Provides a read only view of enrolled course with course details and instructor details|
| List Courses page | Allow users to view the list of available courses. |
| Course Details page | Allow users to view the course details, instructor details and enroll to the course using **Quick Enroll** button. |

**Create Course Announcement:** Microapp is used to create announcement for a course by the Instructor.

|Notification or Page|Use-case workflows|
|:-------------|:-------------|
| Create Course Announcement page | Provides a form to create a announcement for a course with the following details: Course (Courses drop-down), Title, Message and Publish Date  |

**Instructor View:** Microapp is used to view course members and grades by Instructor.

|Notification or Page|Use-case workflows|
|:-------------|:-------------|
| Course Details page | Allow instructors to view the list of available courses. |
| Member Details page | Allow instructors to view the list of members available for the course. |
| Grade Details page | Allow instructors to view the grades of specific member of the course. |

**My Courses:** Microapp is used to view course announcements and attachments of a course

|Notification or Page|Use-case workflows|
|:-------------|:-------------|
| New Course Announcements notification | When there is new announcement for a course, individual students of the course will receives a notification.|
| Course Announcement Detail page | Provides a read only view of new announcement of the course and details. |
| My Courses page | Allow users to view the list of courses user is enrolled. |
| Course Details page | Allow users to view the list of announcements and attachments of a course. |
| Announcement Detail page | Allow users to view the course announcement and its details. |
| Attachment Detail page | Allow users to view and download the attachment. |

**My Grades:** Microapp is used to view grades of a course by Student.

|Notification or Page|Use-case workflows|
|:-------------|:-------------|
| New Grades notification | When there is a new grades posted for a course, individual students of the course will receive notifications. |
| My Grades page | Allow users to view the grades by selecting the course. |
