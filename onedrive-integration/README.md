## Sharepoint Search integration

The sharepoint search script transforms SSQL request to Graph request to search the files/folders from Sharepoint.

### Requirements to test Sharepoint search script:

1. Please check [Console Runner documentation ](https://info.citrite.net/display/WS/Console+Runner+Starting+Guide)

2. Get client id, client secret
   as per  [Graph API documentation](https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-app?tabs=dotnet#register-your-application-with-an-azure-ad-tenant)

3. Required Scopes
    *   Files.Read
    *   Files.ReadWrite
    *   Files.Read.All
    *   Files.ReadWrite.All
    *   Sites.Read.All
    *   Sites.ReadWrite.All

##### API's Used
1. `POST /search/query` To search files/folders from Sharepoint.
2. `GET /sites/root` To retrieve the application domain URL.
3. `GET /sites/{site-id}/drive/items/{item-id}/children` To retrieve the preview web url of files/folder.



