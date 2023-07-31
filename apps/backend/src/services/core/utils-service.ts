import { createService, LogFunction } from "#app";
import cp, { ExecOptions } from "child_process";
import util from "util";

const exec = util.promisify(cp.exec);

export const createUtilsService = () => {
  const service = createService({
    name: "Utils",
  });
  const execWithLog = async (
    command: string,
    options: ExecOptions & { log: { info: LogFunction; error: LogFunction } }
  ) => {
    const { log, ...restOptions } = options;
    const std = {
      out: "",
      err: "",
    };
    try {
      const execOutput = await exec(command, restOptions);
      std.out = execOutput.stdout?.trim() ?? "";
      std.err = execOutput.stderr?.trim() ?? "";
      return execOutput;
    } catch (err) {
      const execOutput = err as { stdout?: string; stderr?: string };
      std.out = execOutput.stdout?.trim() ?? "";
      std.err = execOutput.stderr?.trim() ?? "";
      throw err;
    } finally {
      if (std.out) {
        for (const part of std.out
          .split("\n")
          .map((part) => part.trim())
          .filter((part) => Boolean(part))) {
          log.info(part.trim());
        }
      }
      if (std.err) {
        for (const part of std.err
          .split("\n")
          .map((part) => part.trim())
          .filter((part) => Boolean(part))) {
          log.error(part.trim());
        }
      }
    }
  };
  return {
    call: {
      execWithLog,
    },
    ...service,
  };
};
