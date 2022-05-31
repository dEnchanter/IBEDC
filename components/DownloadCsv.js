export function ExportToCsvButton({children, fetcher}) {
  const anchorElement = useRef(null);

  function onClick() {
    handleDownload();
  }

  return (
    <a ref={anchorElement} onClick={onClick}>
      {children}
    </a>
  )
}