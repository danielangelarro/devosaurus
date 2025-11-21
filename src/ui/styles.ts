export const styles = `
  #devosaurus-root {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    font-family: system-ui, -apple-system, sans-serif;
  }
  .devo-badge {
    background: #222;
    color: #fff;
    padding: 12px 20px;
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;
  }
  .devo-badge.listening {
    background: #e63946;
    border-color: #ff9999;
    animation: pulse 1.5s infinite;
  }
  .devo-status { font-size: 14px; font-weight: 600; }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(230, 57, 70, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(230, 57, 70, 0); }
    100% { box-shadow: 0 0 0 0 rgba(230, 57, 70, 0); }
  }
`;
