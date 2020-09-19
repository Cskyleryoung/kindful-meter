# Kindful Fundraising Meter

A simple, embeddable meter widget that display progress for a Kindful fundraising campaign.

## How to use

1. Add the `kindful-meter.min.js` script just before the closing `body` tag.
2. Add `<div id="kindful-meter" data-kindful-url="[your_kindful_campaign_url]"></div>` to your page where you want the meter to appear.
3. Use optional `data` attributes to customize the meter (see below).

## Available data attributes

### data-kindful-url (required)

The url of your campaign. See https://developer.kindful.com/customer/reference/public_campaign_data for more info.

NOTE: You will need to make sure that your campaign has several options enabled, including "Show goal amount?", "Visible to public?, and "Enable campaign api access?". When all of these are enabled, your URL will be displayed to copy and paste right there in the campaign settings.

### data-color

The background color of your meter in RGB, for example: `35, 207, 130` (which is also the default). Will be displayed as gradient.

### data-height

The height of your meter in pixels. Defaults to `300`.

### data-width

The width of your meter in pixels. Defaults to `60`.

## Misc Notes

Feel free to override other styles with CSS. You may need to use the `!important` override for some as they are inline.

## Use in Wordpress

This file can also be used as a Wordpress plugin. Simply ZIP and upload like any other local plugin. Use the short code `[kindful-meter]`. Pass in data attributes to the short code minus the `data-` string. For example, the bare minimum short code would be `[kindful-meter kindful-url="YOUR_URL_HERE"]`.