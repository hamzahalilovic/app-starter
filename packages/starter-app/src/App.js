import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { usePrifina, Op } from "@prifina/hooks";

const processData = (data) => {};

// unique appID for the app....
const appID = "1u3f465t4cNSWYiyKFVwBG";

const App = () => {
  const { data } = props;
  // init hook and get provider api services...
  const { onUpdate, Prifina, API, registerHooks } = usePrifina();

  const dataUpdate = async (data) => {
    if (
      data.hasOwnProperty("settings") &&
      typeof data.settings === "object" &&
      data.settings.year !== ""
    ) {
      const year = parseInt(data.settings.year);
      const month = parseInt(data.settings.month);
      period.current = year + "/" + month;

      const filter = {};

      // const result = await API[appID].GoogleTimeline.queryActivities({
      //   filter: filter,
      // });
      console.log("DATA ", result.data.getDataObject.content);

      if (result.data.getDataObject.content.length > 0) {
        processData(result.data.getDataObject.content);
      }
    }
  };

  useEffect(async () => {
    // init callback function for background updates/notifications
    onUpdate(appID, dataUpdate);
    // register datasource modules
    // registerHooks(appID, [DataConnector]);
    // get
    console.log("TIMELINE PROPS DATA ", data);

    const d = new Date();
    const currentMonth = d.getMonth();
    d.setMonth(d.getMonth() - 1);
    while (d.getMonth() === currentMonth) {
      d.setDate(d.getDate() - 1);
    }
    let year = d.getFullYear();
    let month = d.getMonth();

    if (
      data.hasOwnProperty("settings") &&
      data.settings.hasOwnProperty("year") &&
      data.settings.year !== ""
    ) {
      year = parseInt(data.settings.year);
      month = parseInt(data.settings.month);
    }

    const filter = {};

    // const result = await API[appID].GoogleTimeline.queryActivities({
    //   filter: filter,
    // });
    console.log("DATA ", result.data.getDataObject.content);

    if (result.data.getDataObject.content.length > 0) {
      processData(result.data.getDataObject.content);
    }
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default App;
