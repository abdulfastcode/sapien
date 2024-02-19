export function useMaxHeaderValues(tableData) {
  console.log("tableData+++++++",tableData)
  if (tableData == null || undefined) return
  let tableHeading = tableData?.map((e) => {
    let header = Object.keys(e);
    return header;
  });
  let initaialVal = tableHeading[0];
  let maxTableHeaders = tableHeading.reduce((acc, curr) => {
    if (curr > acc) acc = curr;
    return acc;
  }, initaialVal);
  let newTableHeader = maxTableHeaders?.filter((e) => e !== "isChecked");

  return newTableHeader
}