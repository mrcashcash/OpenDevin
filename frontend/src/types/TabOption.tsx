enum TabOption {
  TERMINAL = "terminal",
  PLANNER = "planner",
  CODE = "code",
  BROWSER = "browser",
  DATABASE = "database",
}

type TabType =
  | TabOption.TERMINAL
  | TabOption.PLANNER
  | TabOption.CODE
  | TabOption.BROWSER
  | TabOption.DATABASE;

const AllTabs = [
  TabOption.TERMINAL,
  TabOption.PLANNER,
  TabOption.CODE,
  TabOption.BROWSER,
  TabOption.DATABASE,
];

export { AllTabs, TabOption, type TabType };
