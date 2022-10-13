import { useContext, useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import { searchIcon } from "../../assets";
import { SearchContext } from "../../context/SearchContext";

export default function SearchBar() {
  const { value, setValue } = useContext(SearchContext);
  return (
    <div className="search-box">
      <img src={searchIcon} alt="Search Icon" />
      <input
        type="text"
        placeholder="Asset URL / Asset ID / Contract / Keyword"
        onChange={(event) => {
          setValue({ ...value, term: event.target.value });
        }}
      />
      <BasicMenu />
    </div>
  );
}

function BasicMenu() {
  const [filter, setFilter] = useState("All filter");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (event: any) => {
    setFilter(event.target.outerText);
    handleClose();
  };

  return (
    <div className="search-filter">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      >
        {filter}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleSelect}>All Filter</MenuItem>
        <MenuItem onClick={handleSelect}>Asset URL</MenuItem>
        <MenuItem onClick={handleSelect}>Asset ID</MenuItem>
        <MenuItem onClick={handleSelect}>Contract Address</MenuItem>
      </Menu>
    </div>
  );
}
