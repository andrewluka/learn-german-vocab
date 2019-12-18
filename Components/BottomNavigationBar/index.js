import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  BottomNavigation, 
  BottomNavigationAction, 
  withStyles 
} from "@material-ui/core";
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';

const StyledBottomNavigationAction = withStyles({
  root: {
    maxWidth: "100vw",
    background: "white"
  }
})(BottomNavigationAction);

const StyledBottomNavigation = withStyles({
  root: {
    boxShadow: "0 0 3px black",
    zIndex: 1
  }
})(BottomNavigation)


const BottomNavigationBar = () => {
  let history = useHistory();
  let [value, setValue] = useState(location.pathname.replace("/", "") || "home");

  return (
    <StyledBottomNavigation
    showLabels
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
      history.push(`/${newValue}`);
    }}>
      <StyledBottomNavigationAction 
        label="Home"
        value="home"
        icon={<HomeOutlinedIcon />} 
      />
      <StyledBottomNavigationAction 
        label="Learn"
        value="learn" 
        icon={<MenuBookOutlinedIcon />} 
      />
      <StyledBottomNavigationAction 
        label="Practice"
        value="practice" 
        icon={<CreateOutlinedIcon />} 
      />
      <StyledBottomNavigationAction
        label="Vocabulary"
        value="vocabulary"
        icon={<BookOutlinedIcon />}
      />
      {/*<StyledBottomNavigationAction 
        label="Settings"
        value="settings" 
        icon={<SettingsOutlinedIcon />} 
      />*/}
    </StyledBottomNavigation>
  );
}

export default BottomNavigationBar;
