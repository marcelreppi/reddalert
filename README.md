# reddalert

A service that sends email notifications for reddit posts based on keywords for specified subreddits

## How to use

* Configure the ```subreddits.json``` file with the subreddits and keywords you want to track
* Run ```npm start```

## Deployment

* Create a ```variables.env``` file

The ```variables.env``` should look something like this.

```
# variables.env

MAIL_HOST: your_mail_provider_host
MAIL_PORT: your_mail_provider_port
MAIL_SENDER: your_sending_mail_address
MAIL_PW: your_sending_mail_password
MAIL_RECEIVER: your_receiving_mail_address
```