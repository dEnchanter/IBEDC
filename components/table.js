export function Table({ children }) {
  return (
    <table className="text-gray-700 opacity-85 bg-white mx-auto text-sm border-collapse table-fixed w-full">
      {children}
    </table>
  );
}

export function Thead({ children}) {
  return (
    <thead className="border-b-2 border-gray-200 border-separate text-center text-sm">
      {children}
    </thead>
  );
}

export function Tr({ children, border = "border-b border-gray-200", hover }) {
  let _className = `${border} ${hover ? "hover:bg-gray-100" : ""}`;
  return <tr className={_className}>{children}</tr>;
}

export function Th({ children }) {
  return <th className="py-1 px-2 font-semibold">{children}</th>;
}

export function Tbody({ children }) {
  return <tbody className="text-center">{children}</tbody>;
}

export function Td({ children, title }) {
  return (
    <td className="px-2 py-2 truncate" title={title ? title : null}>
      {children}
    </td>
  );
}
