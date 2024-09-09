// logStartupInfo.ts
import colors from "colors";
import os from "os";

const labelsString =
  "Server running on,Environment,Process ID,System Architecture,Running on";
const labelsArray = labelsString.split(",");
const longestLabelLength = Math.max(
  ...labelsArray.map((label) => label.length)
);
const padRight = (label: string, length: number) =>
  label + " ".repeat(Math.max(length - label.length, 0));

export function logStartupInfo(port: number) {
  console.log(
    colors.blue(
      padRight("Server running on", longestLabelLength) +
        ` -> http://localhost:${port}`
    )
  );
  console.log(
    colors.blue(
      padRight("Environment", longestLabelLength) +
        ` -> ${process.env.NODE_ENV || "development"}`
    )
  );
  console.log(
    colors.blue(
      padRight("Process ID", longestLabelLength) + ` -> ${process.pid}`
    )
  );
  console.log(
    colors.blue(
      padRight("System Architecture", longestLabelLength) + ` -> ${os.arch()}`
    )
  );
  console.log(
    colors.blue(
      padRight("Running on", longestLabelLength) +
        ` -> ${os.type()} ${os.release()}`
    )
  );
}

export function logsRedisUtil({ host, port }: { host: any; port: any }) {
  // console.log(colors.red(padRight("Connected to Redis", longestLabelLength)));
  console.log(
    colors.red(
      padRight("Redis Connection", longestLabelLength) + ` -> ${host}:${port}`
    )
  );
}

export async function logDatabaseUtil({
  client,
  mode,
}: {
  client: string;
  mode: string;
}) {
  console.log(
    colors.cyan(padRight("Sequelize URL", longestLabelLength) + ` -> ${client}`)
  );
  console.log(
    colors.cyan(
      padRight("Sequelize sync mode", longestLabelLength) + ` -> ${mode}`
    )
  );
}
