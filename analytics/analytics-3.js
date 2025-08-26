const handleLoginClick = useCallback(() => {
  sendEvent({
    name: "login_button_clicked",
    data: {},
  });
}, []);
