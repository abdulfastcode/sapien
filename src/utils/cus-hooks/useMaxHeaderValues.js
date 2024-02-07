export function useMaxHeaderValues(tableData){
    let tableHeading = tableData.map((e) => {
      let header = Object.keys(e);
      return header;
    });
    let initaialVal = tableHeading[0];
    let maxTableHeaders = tableHeading.reduce((acc, curr) => {
      if (curr > acc) acc = curr;
      return acc;
    }, initaialVal);
    return maxTableHeaders
  }