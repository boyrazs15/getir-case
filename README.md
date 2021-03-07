# getir-case
REST API for Getir Backend Case

This API with a single endpoint fetches the data in the provided MongoDB collection and return the results in the requested format.

https://getir-case-sila.herokuapp.com

# Set up project
```
$git clone https://github.com/boyrazs15/getir-case.git
$cd getir-case
$npm install
$npm run dev
```

# Test project
```
$npm run test
```

# To Get Records API Endpoint is HTTP POST /api/v1/records
https://getir-case-sila.herokuapp.com/api/v1/records

# Sample Request Payload
The request payload will include a JSON with 4 fields.

● “startDate” and “endDate” fields will contain the date in a “YYYY-MM-DD” format. 

● “minCount” and “maxCount” are for filtering the data. 
```
{
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
}
```
# Sample Payload Response
Response payload should have 3 main fields.

● “code” is for status of the request. 0 means success. Other values may be used for errors.

● “msg” is for description of the code. For 0 code msg is "Success".

● “records” will include all the filtered items according to the request. This array includes items of “key”, “createdAt” and “totalCount” which is the sum of the “counts” array in the document.

```
{
  "code":0,
  "msg":"Success",
  "records":[
    {
      "key":"TAKwGc6Jr4i8Z487",
      "createdAt":"2017-01-28T01:22:14.398Z",
      "totalCount":2800
    },
    {
      "key":"NAeQ8eX7e5TEg7oH",
      "createdAt":"2017-01-27T08:19:14.135Z",
      "totalCount":2900
    }
  ]
}
```
