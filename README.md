# Slack custom command for creating ad-hoc Google Hangouts

**This was made without knowledge about [official Hangouts integration](https://issuestand.slack.com/services/2562199464).
You can still use for experimental purposes but for work I recommend using official one.**

Just type `/hangout` in any channel or direct message to create unique Hangout link.

## Installation

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/suda/slack-hangout)

## Configuration

**Warning: for the following steps you can't use Google Apps account.
Just log in with @gmail.com account.**

* Go to [Google Developers Console](https://console.developers.google.com)
* Create Project
* In **APIs & auth** select **APIs** and set **Calendar API** to **ON**
* In **APIs & auth** select **Credentials** and click **Create new Client ID**
  * Set **Application Type** to **Web application**
  * Set **Authorized JavaScript Origins** to your Heroku app URL
  * Set **Authorized Redirect URI** to your Heroku app URL with `/oauth2callback` suffix (i.e. `http://peaceful-journey-9207.herokuapp.com/oauth2callback`)
  * Click **Create Client ID**
* In Heroku go to your app settings and **Config Variables** section
  * Click **Reveal Config Vars**
  * Add **CLIENT_ID** variable with **CLIENT ID** value from Google Developers Console
  * Add **CLIENT_SECRET** variable with **CLIENT SECRET** value from Google Developers Console
  * Add **REDIRECT_URL** variable with **REDIRECT URIS** value from Google Developers Console
* Go to your Heroku app URL with `/auth` suffix (i.e. `http://peaceful-journey-9207.herokuapp.com/auth`)
  * Accept request
  * Copy token into **GOOGLE_TOKEN** Heroku config variable
* Go to [https://api.slack.com/](https://api.slack.com/), scroll to **Authentication** section
  * Issue a token for your Slack user
  * Copy the token to **SLACK_API_TOKEN** Heroku config variable
* Save Heroku variables

## Support

If you have any questions or improvements, [create an issue](https://github.com/suda/slack-hangout/issues/new) :)
