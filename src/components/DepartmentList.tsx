import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Checkbox,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

interface Department {
  department: string;
  sub_departments: string[];
}

interface DepartmentListComponentProps {
  data: Department[];
}

const DepartmentListComponent: React.FC<DepartmentListComponentProps> = ({
  data,
}) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<
    string[]
  >([]);

  const handleExpand = (department: string) => () => {
    setExpanded((prevExpanded) =>
      prevExpanded.includes(department)
        ? prevExpanded.filter((dep) => dep !== department)
        : [...prevExpanded, department]
    );
  };

  const handleCheckboxChange = (subDepartment: string) => () => {
    setSelectedSubDepartments((prevSelected) =>
      prevSelected.includes(subDepartment)
        ? prevSelected.filter((subDept) => subDept !== subDepartment)
        : [...prevSelected, subDepartment]
    );
  };

  const isDepartmentExpanded = (department: string) =>
    expanded.includes(department);

  return (
    <List>
      {data.map((dept) => (
        <div key={dept.department}>
          <ListItem
            onClick={handleExpand(dept.department)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon>
              {isDepartmentExpanded(dept.department) ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItemIcon>
            <ListItemText primary={dept.department} />
          </ListItem>
          <Collapse in={isDepartmentExpanded(dept.department)}>
            <List component="div" disablePadding>
              {dept.sub_departments.map((subDept) => (
                <ListItem
                  key={subDept}
                  onClick={handleCheckboxChange(subDept)}
                  sx={{ cursor: "pointer" }}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={selectedSubDepartments.includes(subDept)}
                      onChange={handleCheckboxChange(subDept)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentListComponent;
