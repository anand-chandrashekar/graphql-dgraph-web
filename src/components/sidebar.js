import React , {useState} from "react"
import { Link } from "gatsby"
import { Accordion } from "react-bootstrap"
import VersionDropdown from "./VersionDropdown"
import SideBarContentDropdown from './sideBarContentDropdown';

import DgraphLogo from "../images/graphql-logo.png"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"

const config = require("../../config")

const SideBar = props => {

  const [showAccordion , toggleAccordion] = useState(false);

  function isActive(obj) {
    return obj.isCurrent ? { className: "active" } : null
  }

  let currentChildren = []
  let currentParent
  let completeRes = []

  completeRes = config.sidebarOptions.map(node => {
    currentParent = node.title
    let mainNode = (
      <li key={node.title} className="sidebar-inline">
        <Link
          to={"/" + node.path.replace("index.mdx", "").replace(".mdx", "")}
          getProps={isActive}
        >
          {node.title}
        </Link>
      </li>
    )
    if (node.children !== undefined) {
      currentChildren = node.children.map(childNode => {
        let child = (
          <li key={childNode.title}>
            <Link
              to={"/" + childNode.path.replace(".mdx", "")}
              getProps={isActive}
            >
              {childNode.title}
            </Link>
          </li>
        )
        return child
      })
    }

    const res = (
      <React.Fragment key={currentParent}>
        <Accordion defaultActiveKey={currentParent} bsPrefix={showAccordion?"accordion-show":"accordion-hide"} >
          {mainNode}
          {currentChildren.length !== 0 && (
            <Accordion.Toggle as="span" eventKey={currentParent} className="accordion-toggle" onClick={()=>{
             showAccordion?toggleAccordion(false):toggleAccordion(true);
            }}>
              <span className="cursor-pointer">
              <MdKeyboardArrowDown className="collapsible-arrow-down" />
              </span>
            </Accordion.Toggle>
          )}
          {currentChildren.length !== 0 && (
            <Accordion.Collapse eventKey={currentParent}>
              <ul className="list-no-style">
                {currentChildren}
              </ul>
            </Accordion.Collapse>
          )}
        </Accordion>
      </React.Fragment>
    )

    currentChildren = []
    return res
  })

  const list = (
    <React.Fragment>
      <div className="sidenav">
        <div className="page-logo">
          <Link to="/" className="img-logo header-link">
            <img src={DgraphLogo} alt="Dgraph logo" />
          </Link>
        </div>
        <VersionDropdown />
        <SideBarContentDropdown />
        <div className="sidebar-wrap">
          <ul>{completeRes}</ul>
        </div>
      </div>
    </React.Fragment>
  )

  return list
}

export default SideBar
