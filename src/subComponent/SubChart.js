import React from "react";
import {ResponsiveBar} from "@nivo/bar";
const SubChart = () => {


    const data =[
        {
            "month": "1",
            "kebab": 20,
            "kebabColor": "hsl(23, 70%, 50%)",
            "fries": 191,
            "friesColor": "hsl(13, 70%, 50%)",
            "donut": 77,
            "donutColor": "hsl(171, 70%, 50%)"
          },
          {
            "month": "2",
            "kebab": 70,
            "kebabColor": "hsl(23, 70%, 50%)",
            "fries": 111,
            "friesColor": "hsl(13, 70%, 50%)",
            "donut": 37,
            "donutColor": "hsl(171, 70%, 50%)"
          },
          {
            "month": "3",
            "kebab": 50,
            "kebabColor": "hsl(23, 70%, 50%)",
            "fries": 101,
            "friesColor": "hsl(13, 70%, 50%)",
            "donut": 77,
            "donutColor": "hsl(171, 70%, 50%)"
          }
      ]

return(
<>
<ResponsiveBar
        data={data}
        keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
        indexBy="month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'blue_green' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'month',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '급여',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in month: "+e.indexValue}}
    />
    </>
);
}

export default SubChart;