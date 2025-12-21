// million-ignore
function Sidebar ( { toggle, expanded } ) {
  return (
    <div className="f fw" style={{ background: "var(--theme)", color: "#fff" }}>
      <div className="tagchip" onClick={toggle}>
        <svg className="quicon" viewBox="0 0 24 24">
          <path stroke="#000" fill={expanded ? "#fff" : "#888"} stroke-width="2" d="M4 19H20l1-1V6L20 5H4L3 6V18Zm3-4 3-2-3-3m5 5h5" />
        </svg>
      </div>
      <hr className="mx-a w-100" style={{ opacity: "0.1" }} />
    </div>
  );
};

export default Sidebar;