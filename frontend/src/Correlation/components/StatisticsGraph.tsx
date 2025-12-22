
import { Box, Center, ChakraProvider } from '@chakra-ui/react';
import LineChart from './LineChart';

interface Props{
    data:any,
    descriptor:string,
    birads_data:any,
    characNormalize:boolean,
}

// interface LineChartProps {
//     data: {
//       labels: string[];
//       datasets: {
//         label: string;
//         data: number[];
//         fill?: boolean;
//         borderColor?: string;
//       }[];
//     };
//     title: string;
//   }

const StatisticsGraph = ({data,descriptor,birads_data,characNormalize}:Props) => {
    if (descriptor==="birads"){return null}
    if (descriptor==="suggestivity")descriptor="special cases";
    const datasets=[];
    const colors=["red","blue","green","yellow","black","purple","orange","brown"];
    let i=0;
    let totalDesc=0;
    let pointData: { [key: string]: {[key:string]: number} } = {};
    for (const carac  in data){
        if (carac==="birads_total"){
          continue;
        };
        const total:number=data[carac]["total"]
        pointData[carac] = data[carac];
        totalDesc+=total;
        let dictionary={label:"",data:[] as number[],fill:false,borderColor:""}
        if (characNormalize){dictionary = {
          label: carac,
          data: [
            data[carac]["2"] / total,
            data[carac]["3"] / total,
            data[carac]["4A"] / total,
            data[carac]["4B"] / total,
            data[carac]["4C"] / total,
            data[carac]["5"] / total
          ],
          fill: false,
          borderColor: colors[i]
        };}
        
        else{dictionary = {
          label: carac,
          data: [
            data[carac]["2"] / birads_data["2"],
            data[carac]["3"] / birads_data["3"],
            data[carac]["4A"] / birads_data["4A"],
            data[carac]["4B"] / birads_data["4B"],
            data[carac]["4C"] / birads_data["4C"],
            data[carac]["5"] / birads_data["5"],
          ],
          fill: false,
          borderColor: colors[i]
        };}
        datasets.push(dictionary);
        i+=1;
    }
    // const datasets= [Object.keys(data).map((carac)=>{})]
  const multiLineChartData = {
    labels: ["2","3","4A","4B","4C","5"],
    datasets: datasets
      // Add more datasets as needed
  };

  return (
      <Box width="46%">
        <LineChart data={multiLineChartData} title={descriptor} totalDesc={totalDesc} pointData={pointData}/>
      </Box>
  );
};

export default StatisticsGraph;