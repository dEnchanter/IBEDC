import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  PieChartIcon,
  HomeIcon,
  HistoryIcon,
  DashboardIcon,
  ChevronDownIcon,
  PosTerminalIcon,
  TransactionIcon,
  UserIcon,
} from "./icons";

import { useUser } from "../hooks/auth";

const routeClass = {
  activeMenuClass: "text-purple-700 bg-purple-200",
  activeSubmenuClass: "",
  inactiveMenuClass: "text-gray-500 hover:bg-purple-200 hover:text-purple-700",
  inactiveSubmenuClass: "",
};

export default function Sidebar() {

  const { user, mutateUser } = useUser({ redirectTo: "/login" });

  const [transition, setTransition] = useState({
    container: "w-16",
    menuLabel: "",
    menuDropDown: "h-0",
    // menuContainer: "items-center",
    dropdownClass: "opacity-100",
    menu: "",
    hei: "max-h-0",
  });

  const [delay, setDelay] = useState("delay-75");
  // TODO This initialization should happen automatically
  const [submenuClass, setSubmenuClass] = useState({
    dashboard: "max-h-0 delay-100",
    terminal: "max-h-0 delay-100",
    transaction: "max-h-0 delay-100",
    user: "max-h-0 delay-100",
  });

  const userDept = user?.data?.department;

  const dashboardMenuDept = ["Management", "Settlement", "Technology", "Business", "Risk", "Finance", "Operations", "Customersupport"];
  const TransactionMenuDept = ["Operations", "External", "Settlement", "Customersupport", "Management", "Business", "Technology", "Finance", "Risk"];
  const TerminalMenuDept = ["Operations", "Technology", "Customersupport", "Risk", "Business", "Risk"];

  // Transactions 
  const Ejournal = ["Operations", "External", "Customersupport", "Business", "Technology", "Risk"];
  const Details = ["Settlement", "Management", "Business", "Technology", "Risk", "Finance", "Customersupport"];
  const Settlement = ["Settlement", "Customersupport", "Business", "Technology", "Risk", "Finance"];
  const Vas = ["Settlement", "Customersupport", "Business", "Technology", "Risk", "Finance"];
  const Comission = ["Settlement", "Technology", "Finance", "Risk"];
  const Chargebacks = ["Settlement", "Technology", "Finance", "Risk"];


  // Terminals
  const Terminals = ["Operations", "Customersupport", "Technology", "Business", "Risk"];
  const TerminalOwner = ["Operations", "Customersupport", "Business", "Technology", "Risk"];
  const Managers = ["Operations", "Settlement", "Customersupport", "Management", "Business", "Technology", "Risk"];
  const Agents = ["Operations", "Customersupport", "Management", "Business", "Technology", "Risk"];
  const Merchants = ["Operations", "Customersupport", "Management", "Business", "Technology", "Risk"];
  const Acquirers = ["Operations", "Business", "Technology"];
  const LoadTerminals = ["Operations", "Technology"];

  // User Mgt
  const manageUsers = [ "Risk", "Technology"];
  const auditLogs = ["Risk"]
  const passwordReset = ["Operations", "External", "Settlement", "Customersupport", "Management", "Business", "Technology", "Risk", "Finance"];

  useEffect(() => {
    if (transition.container === "w-60") {
      setDelay("");
    }
    if (transition.container === "w-16") {
      setDelay("delay-150");
    }
  }, [transition.container]);

  const router = useRouter();
  const [menu, submenu] = router.pathname.split("/").filter((p) => !!p); // remove falsies

  function handleMouseOver(e) {
    setTransition({
      ...transition,
      container: "w-60",
      menuLabel: "",
      menuContainer: "items-start",
      dropdownClass: "opacity-100",
      menu: "",
    });
  }
  function handleMouseOut(e) {
    let updatedSubMenuClass = collapseSubmenu(submenuClass);
    setSubmenuClass(updatedSubMenuClass);
    setTransition({
      container: "w-16",
      menuLabel: "",
      menuContainer: "items-start",
      dropdownClass: "opacity-0",
      menuDropDown: "",
      menu: "",
    });
  }

  function collapseSubmenu(submenuClass) {
    let updatedSubMenuClass = {};
    for (let key of Object.keys(submenuClass)) {
      updatedSubMenuClass[key] = "max-h-0 delay-100";
    }
    return updatedSubMenuClass;
  }

  function handleOnShowMenuClick(key) {
    const toggledSubMenuClass = toggleSubMenu(key, submenuClass);
    setSubmenuClass(toggledSubMenuClass);
  }

  function toggleSubMenu(currentKey, submenuClass) {
    // setTransition({
    //   ...transition,
    //   hei: transition.hei === "max-h-0" ? "max-h-144" : "max-h-0",
    // });
    let currentClass = submenuClass[currentKey];
    // submenu is not open
    if (currentClass === "max-h-0 delay-100") {
      let updatedMenuClass = {};
      for (let key of Object.keys(submenuClass)) {
        updatedMenuClass[key] = "max-h-0 delay-100";
        updatedMenuClass[currentKey] = "max-h-144";
      }
      return updatedMenuClass;
    }
    if (currentClass === "max-h-144") {
      return { ...submenuClass, [currentKey]: "max-h-0 delay-100" };
    }
  }



  return (
    <div
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      className={`fixed left-0 inset-y-0 z-30 h-screen bg-purple-50 bg-opacity-50 backdrop-filter backdrop-blur-sm px-2 transition-width duration-500 ${transition.container} text-sm overflow-x-hidden  __sidebar`}
    >
      <div className={`w-12 h-16 flex justify-center items-center pb-2`}>
        <img className="" src="/fets-logo.png" alt="Fets logo" />
      </div>
      <div
        className={`text-gray-500 mt-5 flex flex-col ${transition.menuContainer}`}
      >
        {/* DASHBOARD MENU */}
        
        {dashboardMenuDept.includes(userDept) ?
          <div
            className={` px-2 py-2 ${transition.menu} ${
              is(menu, "dashboard")
                ? routeClass.activeMenuClass
                : routeClass.inactiveMenuClass
            } rounded w-full flex items-center`}
          >
            <span className="">
              <DashboardIcon h="h-8" />
            </span>
            <Link href="/dashboard/summary">
              <a
                className={`ml-5 transition duration-75 w-full ${delay} ${transition.menuLabel}` }
              >
                Dashboard
              </a>
            </Link>
          </div> : ''
        }
        {/* <div
          className={`flex flex-col transition-maxHeight duration-700 overflow-hidden mb-4 ${transition.dropdownClass} w-full ${submenuClass["dashboard"]}`}
        >
          <Link href="/dashboard/summary">
            <a className="p-1">Dashboard Summary</a>
          </Link>
        </div> */}
        {/* END DASHBOARD MENU */}

        
        {/* TRANSACTION MENU */}
        
        {TransactionMenuDept.includes(userDept) ?
        <div
          className={` px-2 py-2 ${transition.menu} ${
            is(menu, "transaction")
              ? routeClass.activeMenuClass
              : routeClass.inactiveMenuClass
          } rounded w-full flex items-center`}
        >
          <span className="">
            <TransactionIcon h="h-8" />
          </span>
          <span
            className={`ml-5 transition duration-75 ${delay} ${transition.menuLabel}`}
          >
            Transaction
          </span>
          <span
            onClick={() => handleOnShowMenuClick("transaction")}
            className={`ml-5 h- block justify-self-end flex-grow text-right transition duration-75 ${delay} ${transition.menuLabel}`}
          >
            <ChevronDownIcon />
          </span>
        </div> : ''
        }

        <div
          className={`flex flex-col transition-maxHeight duration-700 overflow-hidden mb-4 ${transition.dropdownClass} w-full ${submenuClass["transaction"]}`}
        >
          {Ejournal.includes(userDept) &&
          <Link href="/transaction/e-journal">
            <a className="p-1 ml-14"> - E-journal</a>
          </Link>
          }
          {Details.includes(userDept) &&
          <Link href="/transaction/details">
            <a className="p-1 ml-14"> - Details</a>
          </Link>
          }
          {Settlement.includes(userDept) &&
          <Link href="/transaction/settlements">
            <a className="p-1 ml-14"> - Settlement</a>
          </Link>
          }
          {Vas.includes(userDept) &&
          <Link href="/transaction/vas">
            <a className="p-1 ml-14"> - VAS</a>
          </Link>
          }
          {Comission.includes(userDept) &&
            <Link href="/transaction/comission">
              <a className="p-1 ml-14"> - Comission Report</a>
            </Link>
          }
          {Chargebacks.includes(userDept) &&
            <Link href="/chargebacks/bulk-reciept">
              <a className="p-1 ml-14"> - Chargebacks</a>
            </Link>
          }
        </div>
        {/* END TRANSACTION MENU */}


        {/* TERMINAL MENU */}
        {TerminalMenuDept.includes(userDept) ?
        <div
          className={`px-2 py-2 ${transition.menu} ${
            is(menu, "terminal")
              ? routeClass.activeMenuClass
              : routeClass.inactiveMenuClass
          } rounded w-full flex items-center`}
        >
          <span>
            <PosTerminalIcon h="h-8" />
          </span>
          <span
            className={`ml-5 transition duration-75 ${delay} ${transition.menuLabel}`}
          >
            Terminal
          </span>
          <span
            onClick={() => handleOnShowMenuClick("terminal")}
            className={`ml-5 h- block justify-self-end flex-grow text-right transition duration-75 ${delay} ${transition.menuLabel}`}
          >
            <ChevronDownIcon />
          </span>
        </div> : ''
        }

        <SubmenuContainer
          name="terminal"
          transition={transition}
          submenuClass={submenuClass}
        >
          {Terminals.includes(userDept) &&
          <Link href="/terminal/manage">
            <a className="p-1 ml-14"> - Terminals</a>
          </Link>
          }
          {TerminalOwner.includes(userDept) &&
          <Link href="/terminal/terminal-owner">
            <a className="p-1 ml-14"> - Terminal Owners</a>
          </Link>
          }
          {TerminalOwner.includes(userDept) &&
            <Link href="/terminal/terminal-groups">
              <a className="p-1 ml-14"> - Terminal Groups</a>
            </Link>
          }
          {Managers.includes(userDept) &&
          <Link href="/terminal/managers">
            <a className="p-1 ml-14"> - Managers</a>
          </Link>
          }
          {Agents.includes(userDept) &&
          <Link href="/terminal/agents">
            <a className="p-1 ml-14"> - Agents</a>
          </Link>
          }
          {Merchants.includes(userDept) &&
          <Link href="/terminal/merchants">
            <a className="p-1 ml-14"> - Merchants</a>
          </Link>
          }
          {Acquirers.includes(userDept) &&
          <Link href="/terminal/acquirers">
            <a className="p-1 ml-14"> - Acquirers</a>
          </Link>
          }
          {LoadTerminals.includes(userDept) &&
          <Link href="/terminal/load-terminal">
            <a className="p-1 ml-14"> - Load Terminal</a>
          </Link>
          }
        </SubmenuContainer>
        {/* END TERMINAL MENU */}
        {/* USER MENU */}
        
        <div
          className={`px-2 py-2 ${transition.menu} ${
            is(menu, "user")
              ? routeClass.activeMenuClass
              : routeClass.inactiveMenuClass
          } rounded w-full flex items-center`}
        >
          <span>
            <UserIcon />
          </span>
          <span
            className={`ml-5 transition duration-75 ${delay} ${transition.menuLabel}`}
          >
            User Mgt.
          </span>
          <span
            onClick={() => handleOnShowMenuClick("user")}
            className={`ml-5 h- block justify-self-end flex-grow text-right transition duration-75 ${delay} ${transition.menuLabel}`}
          >
            <ChevronDownIcon />
          </span>
        </div> 
        
        <div
          className={`flex flex-col transition-maxHeight duration-700 overflow-y-hidden ${transition.dropdownClass} w-full ${submenuClass["user"]}`}
        >
          {manageUsers.includes(userDept) &&
          <Link href="/user/manage-users">
            <a className="p-1 ml-14"> - Manage Users</a>
          </Link>
          }
          {auditLogs.includes(userDept) &&
          <Link href="/system/audit-logs">
            <a className="p-1 ml-14"> - Audit Logs</a>
          </Link>
          }
          {passwordReset.includes(userDept) &&
          <Link href="/user/reset-password">
            <a className="p-1 ml-14"> - Reset My Password</a>
          </Link>
          }
        </div>
        {/* END USER MENU */}
      </div>
    </div>
  );
}

function MenuItem({ href, icon, label }) {
  const Icon = icon;
  return (
    <li>
      <Link href={href}>
        <a className="flex items-center px-5 py-3 hover:bg-purple-800 hover:text-purple-100">
          <span className="mr-5">
            <Icon />
          </span>
          <span>{label}</span>
        </a>
      </Link>
    </li>
  );
}

function SubmenuContainer({ children, name, transition, submenuClass }) {
  return (
    <div
      className={`flex flex-col transition-maxHeight duration-700 overflow-y-hidden mb-4 ${transition.dropdownClass} w-full ${submenuClass[name]}`}
    >
      {children}
    </div>
  );
}

function is(token1, token2) {
  if (token1 && token2) {
    return token1.trim().toLowerCase() === token2.trim().toLowerCase();
  } else {
    return false;
  }
}
