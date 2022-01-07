import React from 'react';
import PropTypes from 'prop-types';
import { BillboardChart } from 'nr1'
import {Card, CardBody, HeadingText, NrqlQuery, Spinner, AutoSizer} from 'nr1';

export default class QueryVizByMonthORWeekVisualization extends React.Component {
    static propTypes = {
        lastnmonths: PropTypes.string,
        lastnweeks: PropTypes.string,
        lastxmonths: PropTypes.string,
        partialdata: PropTypes.string,
        nrqlQueries: PropTypes.arrayOf(
            PropTypes.shape({
                accountId: PropTypes.number,
                query: PropTypes.string,
            })
        ),
    };

    render() {
        const {nrqlQueries, lastnweeks, lastnmonths, lastxmonths, partialdata} = this.props;
        const nrqlQueryPropsAvailable =
            nrqlQueries &&
            nrqlQueries[0] &&
            nrqlQueries[0].accountId &&
            nrqlQueries[0].query;

        if (!nrqlQueryPropsAvailable) {
            return <EmptyState />;
        }
        let Flag = "MONTHS";
        if(!lastnmonths)
        {
            if(!lastnweeks)
            {
                if(!lastxmonths)
                {
                    return(
                            <BillboardChart
                                accountId={nrqlQueries[0].accountId}
                                query={ nrqlQueries[0].query}
                                fullWidth
                                fullHeight
                                />
                        );
                }else
                {
                    Flag = "XMONTH";
                }
            }else{
                Flag = "WEEK";
            }
        }
        /*
        *  ***************** Last 4 weeks and partial YES *************************
        *
        *  Query firstDay for Week... 2021-12-06 00:00:00
        *  Query lastDay for Week ... 2022-01-07 12:19:49
        *  Query FROM SyntheticCheck SELECT count(*) where result='SUCCESS' 
        *  facet weekOf(timestamp) since '2021-12-06 00:00:00' until '2022-01-07 12:19:49' ... 
        * 
        * ***************** Last 4 weeks and partial NO *************************
        *
        *  Query firstDay for Week... 2021-12-06 00:00:00
        * Query lastDay for Week ... 2022-01-02 23:59:59
        * Query FROM SyntheticCheck SELECT count(*) where result='SUCCESS' facet weekOf(timestamp) 
        * since '2021-12-06 00:00:00' until '2022-01-02 23:59:59' ... 
        * 
        */ 
        if(Flag == "WEEK"){
            //'2021-12-01 00:00:00'
            var d = new Date();
            let lastDayWeek; 
            if(partialdata!="Yes")
            {
                lastDayWeek = formatDate(firstDayOfWeek(d, 0), false, false);
            }else{
                var tdy = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());
                lastDayWeek = formatDate(tdy, true, false);
            }        
            var firstDayWeek = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (lastnweeks * 7));
            firstDayWeek = formatDate(firstDayOfWeek(firstDayWeek, 1),false, true);

            lastDayPrevMonth = lastDayWeek;
            firstDay = firstDayWeek;
            //console.log("Query firstDay for Week... " + firstDay);
            //console.log("Query lastDay for Week ... " + lastDayPrevMonth);
        }else if(Flag == "MONTHS"){
            var d = new Date();
            d.setMonth(d.getMonth() - parseInt(lastnmonths,10));
            var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
            firstDay = formatDate(firstDay, false, true);

            var date = new Date();
            var lastDayPrevMonth;
            if(partialdata!="Yes")
            {
                lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
                lastDayPrevMonth = formatDate(lastDayPrevMonth, false, false);
            }else{
                lastDayPrevMonth = formatDate(date, true, false);
            }
            //console.log("Query firstDay ... " + firstDay);
            //console.log("Query lastDayPrevMonth ... " + lastDayPrevMonth);
        }else{
            var d = new Date();
            d.setMonth(d.getMonth() - parseInt(lastxmonths,10));
            var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
            firstDay = formatDate(firstDay, false, true);
            var lastDayPrevMonth;
            lastDayPrevMonth = new Date(d.getFullYear(), d.getMonth()+1, 0);
            lastDayPrevMonth = formatDate(lastDayPrevMonth, false, false);
            //console.log("Query firstDay x month ... " + firstDay);
            //console.log("Query lastDay x month ... " + lastDayPrevMonth);
        }

        //FROM SyntheticCheck SELECT count(*) facet monthOf(timestamp) since '1111-11-11 00:00:00' until '2222-22-22 00:00:00'
        let v = nrqlQueries[0].query;
        v = v + ' since \'' + firstDay + '\' until \'' + lastDayPrevMonth + '\''; // + ' WITH TIMEZONE \'America/Los_Angeles\'';
        console.log("Query ..." + v );

        return (
            <BillboardChart
                accountId={nrqlQueries[0].accountId}
                query={v}
                fullWidth
                fullHeight
            />
        );
    }
}
//Sunday=0
function firstDayOfWeek(dateObject, firstDayOfWeekIndex) {

    const dayOfWeek = dateObject.getDay(),
        firstDayOfWeek = new Date(dateObject),
        diff = dayOfWeek >= firstDayOfWeekIndex ?
            dayOfWeek - firstDayOfWeekIndex :
            6 - dayOfWeek

    firstDayOfWeek.setDate(dateObject.getDate() - diff)
    firstDayOfWeek.setHours(0,0,0,0)

    return firstDayOfWeek
}

function formatDate(dateParam, actualTime, startFlag)
{
    let yr = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateParam);
    let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(dateParam);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateParam);
    let hr = new Intl.DateTimeFormat('en', { hour: '2-digit', hour12: false }).format(dateParam);
    let mn = new Intl.DateTimeFormat('en', { minute: 'numeric' }).format(dateParam);
    let sc = new Intl.DateTimeFormat('en', { second: 'numeric' }).format(dateParam);
    
    da = ('0' + da).slice(-2);
    mo = ('0' + mo).slice(-2);
    hr = ('0' + hr).slice(-2);
    mn = ('0' + mn).slice(-2);
    sc = ('0' + sc).slice(-2);
    let fmttDT;
    if(actualTime == true)
    {
        fmttDT = `${yr}-${mo}-${da} ${hr}:${mn}:${sc}`;
        console.log("actual time formatDate ... " + fmttDT);
    }else{
        if(startFlag==true){
            fmttDT = `${yr}-${mo}-${da}` + " 00:00:00";
        }
        else{
            fmttDT = `${yr}-${mo}-${da}` + " 23:59:59";
        }
        console.log("Midnight time formatDate ... " + fmttDT);
    }

    return fmttDT;
}

function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}

const EmptyState = () => (
    <Card className="EmptyState">
        <CardBody className="EmptyState-cardBody">
            <HeadingText
                spacingType={[HeadingText.SPACING_TYPE.LARGE]}
                type={HeadingText.TYPE.HEADING_3}
            >
                An example NRQL query (do not use since until clause)
            </HeadingText>
            <code>

                 FROM SyntheticCheck SELECT count(*) where result='SUCCESS' facet monthOf(timestamp) 
           
            </code>
            <code>

                 FROM SyntheticCheck SELECT count(*) where result='SUCCESS' facet weekOf(timestamp) 

            </code>
            <HeadingText
                spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                type={HeadingText.TYPE.HEADING_4}
            >
            </HeadingText>
            <HeadingText
                spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                type={HeadingText.TYPE.HEADING_5}
            >
                1. Please provide one NRQL query and account ID pair only. 
            </HeadingText>
            <HeadingText
                spacingType={[HeadingText.SPACING_TYPE.MEDIUM]}
                type={HeadingText.TYPE.HEADING_5}
            >
                2. Choose "Last n Months"  or  "Last n Weeks" based on Facet.
            </HeadingText>
            
        </CardBody>
    </Card>
);

const ErrorState = () => (
    <Card className="ErrorState">
        <CardBody className="ErrorState-cardBody">
            <HeadingText
                className="ErrorState-headingText"
                spacingType={[HeadingText.SPACING_TYPE.LARGE]}
                type={HeadingText.TYPE.HEADING_3}
            >
                Something went wrong! Please contact srohatgi@newrelic.com.
            </HeadingText>
        </CardBody>
    </Card>
);