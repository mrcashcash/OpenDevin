enum TabOption {
  PLANNER = "planner",
  CODE = "code",
  BROWSER = "browser",
  DATABASE = "database",
}

type TabType =
  | TabOption.PLANNER
  | TabOption.CODE
  | TabOption.BROWSER
  | TabOption.DATABASE;

const AllTabs = [
  TabOption.PLANNER,
  TabOption.CODE,
  TabOption.BROWSER,
  TabOption.DATABASE,
];

export { AllTabs, TabOption, type TabType };
