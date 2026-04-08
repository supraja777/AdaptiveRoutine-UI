const LeftPanel = () => {
  const style: React.CSSProperties = {
    flex: 1,
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    borderRight: '1px solid #ececec'
  };

  return (
    <div style={style}>
      Hello World
    </div>
  );
};

export default LeftPanel;