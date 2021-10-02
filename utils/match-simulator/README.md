# Match Simulator

High-level explanation of how it works.

1. Matches (teams, locations, dates) are decided at the beginning of the season.
1. They are simulated just before the date
   - In the future each period can be simulated, to allow more interaction from users such as doing substitutions in real time (applied for the next period, tactics changes, etc.)
1. The simulation loop runs a number of time that depends on the taken [actions](./action) and their durations.
1. The generated output is the [match log](./action-log) represented by the list of outcomes for each action, for each period.
1. Each ActionLog then creates a comment generated from the decided ActionLog data and the Match data.
1. To display rich data, the comment representation need to be created at rendering time (i.e. to provide interaction and show links for players, teams and others such as rich UI with icons, etc.)
1. Because each ActionLog will result in a random comment from its list (to provide more variety), the shown comment needs to be stored so every time is shown the same log for the same match, but the data used by the comment can be generated from the ActionLog data and the Match data.
1. In result, the needed data (sent to the client + stored in the database) to ensure the correct reproduction of the match every time is just the ActionLog data (time, type, data...) and the Match data.
