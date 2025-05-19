import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";

const GitHubActivity = () => {
  const [weeksToShow, setWeeksToShow] = useState(52);

  useEffect(() => {
    const updateWeeks = () => {
      const width = window.innerWidth;
      if (width < 400) setWeeksToShow(4);
      else if (width < 640) setWeeksToShow(12);
      else if (width < 1024) setWeeksToShow(26);
      else setWeeksToShow(52);
    };

    updateWeeks(); // initial call
    window.addEventListener("resize", updateWeeks);
    return () => window.removeEventListener("resize", updateWeeks);
  }, []);

  return (
    <div className="bg-gradient-to-r from-stone-700 to-stone-600 dark:from-stone-700 darK:to-stone-600 text-white font-semibold p-4 rounded-lg border border-gray-700 w-full overflow-x-auto">
      <GitHubCalendar
        username="utsab-ad"
        colorScheme={`light`}
        blockSize={14}
        blockMargin={4}
        fontSize={14}
        hideTotalCount={true}
        hideColorLegend={true}
        weeks={weeksToShow}
        style={{ maxWidth: "100%", minWidth: "100%", overflowX: "auto" }}
      />
    </div>
  );
};

export default GitHubActivity;
