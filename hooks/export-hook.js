import { useEffect, useState } from "react";
import { useAlert } from "../components/alertBar";

export function useExport(
  fetcher,
  { headers, filename = "reporting.csv" } = {}
) {
  const { error: errorAlert } = useAlert();
  const [data, setData] = useState("");
  const [fetchDone, setDone] = useState(null);

  useEffect(() => {
    console.log("Running export hook...");
    console.log(data);
    console.log(fetchDone);
    if (fetchDone && data) {
      console.log("Found data and done...");
      fetchDone();
    }
  }, [fetchDone, data]);

  function onClick(event, done) {
    console.log(event)
    console.log(done)
    onClickh(done);
  }

  async function onClickh(done) {
    console.log("Running onclick...");
    console.log(done);
    try {
      const data = await fetcher();
      setData([data]);
      setDone(done);
    } catch (error) {
      errorAlert(error.message);
      done(false);
    }
  }
  function getExportBtnProps() {
    return {
      onClick,
      data,
      headers,
      filename,
      target: "_blank",
      asyncOnClick: true,
    };
  }

  return { getExportBtnProps };
}
