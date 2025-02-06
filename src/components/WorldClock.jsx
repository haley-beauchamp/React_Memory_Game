import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

export default function WorldClock() {
	const timezoneFormat = "HH:mm:ss";
	const timezones = moment.tz.names();

	const [selectedTimezone, setSelectedTimezone] = useState("UTC");
	const [time, setTime] = useState(moment.tz(selectedTimezone).format(timezoneFormat));

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(moment.tz(selectedTimezone).format(timezoneFormat));
		}, 1000);

		return () => clearInterval(interval);
	}, [selectedTimezone]);

	return (
		<div className='clock'>
			<h2>World Clock</h2>
			<label htmlFor="timezone-select">Select Timezone</label>
			<select id='timezone-select' value={selectedTimezone} onChange={(e) => setSelectedTimezone(e.target.value)}>
				{timezones.map((timezone) => (
					<option key={timezone} value={timezone}>
						{timezone}
					</option>
				))}
			</select>
			<h3>
				Time in {selectedTimezone}: {time}
			</h3>
		</div>
	);
}
