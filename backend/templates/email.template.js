const signupTemplate = (data) => {
  return `
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                href="https://fonts.googleapis.com/css2?family=Abyssinica+SIL&family=Inter:wght@400;500;600&display=swap"
                rel="stylesheet"
                />
            </head>
            <style>
                body {
                background-color: #f4f4f5;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: "Inter", sans-serif;
                color: #344054;
                font-weight: 400;
                font-size: 16px;
                line-height: 24px;
                letter-spacing: 1px;
                }
            </style>
    <body>
        <div
        style="
            max-width: 768px;
            max-height: 880px;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
        "
        >
        <h1>SignUp Mail by Noman</h1>
        <p>Hi ${data?.name},</p>
        <p>This is your verification code:</p>
        <div style="padding: 30px 0px">
            ${[0, 1, 2, 3].map(
              (index) =>
                `<span
            style="
                color: #7f56d9;
                border: solid #7f56d9 3px;
                font-weight: 500;
                font-size: 48px;
                border-radius: 8px;
                padding: 4px 16px;
                margin-right: 5px;
            "
            >${data?.otp?.charAt(index)}</span
            >
            `
            )}      
            
        </div>
        <p style="max-width: 640px; font-style: normal; margin-bottom: 30px">
            This code will only we valid for the next 10 minutes, If the code does not work, You
            con use this login verification link:
        </p>
        <a
            href=${data?.url}
            style="
            background-color: #7f56d9;
            color: #ffffff;
            font-weight: 600;
            padding: 10px 18px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            "
            >Verify email</a
        >
        <p style="margin-top: 40px">
            Thanks <br />
            <strong>Noman The Dev</strong>
        </p>
        </div>
    </body>
    </html>

      `;
};

const forgetTemplate = (data, token) => {
  //   console.log("tokenInTemplte", token);
  return `
       <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
            href="https://fonts.googleapis.com/css2?family=Abyssinica+SIL&family=Inter:wght@400;500;600&display=swap"
            rel="stylesheet"
            />
        </head>
        <style>
            body {
            background-color: #f4f4f5;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "Inter", sans-serif;
            color: #344054;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 1px;
            }
        </style>
        <body>
        
            <div
            style="
                max-width: 768px;
                max-height: 880px;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
            "
            >
            <h1>Forgot Password</h1>
            <p>Hi ${data?.name},</p>
            <div style="padding: 30px 0px">
                <a
                href="http://127.0.0.1:3000/reset-password?token=${token}"
                style="
                background-color: #7f56d9;
                color: #ffffff;
                font-weight: 600;
                padding: 10px 18px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 18px;
                "
                >Click here to Update your password</a
            >
            </div>
            <p style="max-width: 640px; font-style: normal; margin-bottom: 30px">
                This email will only we valid for the next 60 minutes.
            </p>

            <p style="margin-top: 40px">
                Thanks <br />
                <strong>Prince Engg.</strong>
            </p>
            </div>
        </body>
        </html>
   `;
};
export { forgetTemplate, signupTemplate };
