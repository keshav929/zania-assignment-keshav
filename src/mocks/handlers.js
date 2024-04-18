import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/save-document-types", async ({ request }) => {
    const requestBody = await request.json();
    requestBody.forEach((element,index) => {
        element['position'] = index;
    });
    console.log(requestBody);
    localStorage.setItem("documentTypes", JSON.stringify(requestBody));
    return HttpResponse.json({
      status: 200
    });
  }),

  http.get("/api/get-document-types", (resolver) => {
    return HttpResponse.json(JSON.parse(localStorage.getItem("documentTypes")));
  }),
];
