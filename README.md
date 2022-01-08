[![New Relic Experimental header](https://github.com/newrelic/opensource-website/raw/master/src/images/categories/Experimental.png)](https://opensource.newrelic.com/oss-category/#new-relic-experimental)

# [NR1-Viz-NRQL-By-MonthORWeek] 

- [Introduction](#intro)
- [Use Cases](#use-cases)
- [Pre-requisites](#pre-reqs)
- [App Installation](#install)
- [Configuration](#config)
- [Issues and Roadmap](#issues)
- [Security](#security)
- [License](#license)

# Introduction <a id="intro"></a>

NR1-Viz-NRQL-By-MonthORWeek enhances NRQL timeline facet capability by enabling user to pull data for complete month(s) or week(s) or an exact Month.

- Retrieve data aggregated by months for last n Months
- Retrieve data aggregated by months for last n Months and also include partial month data for the current month
- Get data aggregated by weeks for last n Weeks
- Get data aggregated by weeks for last n Weeks and also include partial week data for the current week
- Retrieve data for a certain month relative to the current month

![Session Timeline Screenshot](Docs/Intro.png)

## Use Cases <a id="use-cases"></a>

1. Reports to Compare Monthly data 
   e.g. In terms of Page Views,... what progress are we making on monthly basis?

2. Analyze Weekly Trends
   e.g. What is our weekly pattern for Page Views or ...?

3. Quarterly Month Comparision
   e.g. Is the first month of the last quarter was slow in terms of Page Views or ...?

4. Current Month/Week progress compared to past months/week 
   e.g. How are we fairing/progressing in terms of Page Views or ...?

## Pre-requisites <a id="pre-reqs"></a>

   - Familarity with NRQL
   - New Relic agents installed and reporting data to New Relic One Platform
   - Ability to create Dashboards. 

## App Installation <a id="install"></a>

- Clone the repo
- run `npm install`
- run `nr1 nerdpack:uuid -gf`

Follow these instructions to [test locally](https://developer.newrelic.com/build-apps/publish-deploy/serve/).

Follow these instructions to [publish](https://developer.newrelic.com/build-apps/publish-deploy/publish/) the app to New Relic, and [subscribe](https://developer.newrelic.com/build-apps/publish-deploy/subscribe/) your account to use it.

## Configuration  <a id="config"></a>


## Support  <a id="support"></a>

New Relic hosts and moderates an online forum where customers can interact with New Relic employees as well as other customers to get help and share best practices. Like all official New Relic open source projects, there's a related Community topic in the New Relic Explorers Hub. You can find this project's topic/threads here:

>Add the url for the support thread here

## Issues and Roadmap <a id="issues"></a>

To view a listing of enhancement requests and known bugs - or to request a new feature or report a bug - please visit the repository [issues page](https://github.com/newrelic-experimental/NR1-Viz-NRQL-By-MonthORWeek/issues).
**A note about vulnerabilities**

## Security <a id="security"></a>

As noted in our [security policy](../../security/policy), New Relic is committed to the privacy and security of our customers and their data. We believe that providing coordinated disclosure by security researchers and engaging with the security community are important means to achieve our security goals.

If you believe you have found a security vulnerability in this project or any of New Relic's products or websites, we welcome and greatly appreciate you reporting it to New Relic through [HackerOne](https://hackerone.com/newrelic).

## License <a id="license"></a>
[NR1-Viz-NRQL-By-MonthORWeek] is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.
>[If applicable: The [project name] also uses source code from third-party libraries. You can find full details on which libraries are used and the terms under which they are licensed in the third-party notices document.]
