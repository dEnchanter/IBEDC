export default {
  get: function (url, data, options) {
    return handle(true, url, data, options);
  },
  post: function (url, data, options) {
    return handle(true, url, data, options);
  },
};

function handle(successful, url, data, options) {
  console.log(`fetching from ${url}, with options ${JSON.stringify(options)}`);
  console.log(`payload: ${JSON.stringify(data)}`);
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(successful ? dummyData[url].success : dummyData[url].failure),
      3000
    )
  );
}

const dummyData = {
  "/login": {
    success: {
      status: true,
      message: "Login Successful",
      data: {
        userId: "60360c0c4d47deb9eb69461c",
        email: "ewebstech@gmail.com",
        role: "level1",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDM2MGMwYzRkNDdkZWI5ZWI2OTQ2MWMiLCJlbWFpbCI6ImV3ZWJzdGVjaEBnbWFpbC5jb20iLCJyb2xlIjoibGV2ZWwxIiwiZnVsbE5hbWUiOiJFbW1hbnVlbCBQYXVsIiwic3RhdHVzIjp0cnVlLCJwYXNzd29yZFJlc2V0IjpmYWxzZSwiaWF0IjoxNjE0MTU0ODQ1LCJleHAiOjE2MTQxNTg0NDV9.RoAXnqF4ViFzUKrjPLsuwpGaH8_qMYsRdxUXOZKlaiU",
        fullName: "Emmanuel Paul",
        status: true,
        passwordReset: false,
      },
    },
  },
  "/api/v1/user": {
    success: {
      status: true,
      message: "Login Successful",
      data: {
        userId: "60360c0c4d47deb9eb69461c",
        email: "ewebstech@gmail.com",
        role: "level1",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDM2MGMwYzRkNDdkZWI5ZWI2OTQ2MWMiLCJlbWFpbCI6ImV3ZWJzdGVjaEBnbWFpbC5jb20iLCJyb2xlIjoibGV2ZWwxIiwiZnVsbE5hbWUiOiJFbW1hbnVlbCBQYXVsIiwic3RhdHVzIjp0cnVlLCJwYXNzd29yZFJlc2V0IjpmYWxzZSwiaWF0IjoxNjE0MTU0ODQ1LCJleHAiOjE2MTQxNTg0NDV9.RoAXnqF4ViFzUKrjPLsuwpGaH8_qMYsRdxUXOZKlaiU",
        fullName: "Emmanuel Paul",
        status: false,
        passwordReset: false,
      },
    },
    failed: undefined,
  },
};
