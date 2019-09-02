import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import useCycleColor from '../../hooks/useCycleColor';
import ToggleOpen from '../../icons/ToggleOpen';
import mediaqueries from '../../styles/media';
import Button from '../Button';
import Tree from './Tree';

const LeftSidebar = ({ navOpen }) => {
  const { cycleColorMode } = useCycleColor();
  const {
    allMdx: { edges }
  } = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
              title
            }
          }
        }
      }
    }
  `);
  return (
    <LeftSidebarWrapper>
      <LeftSidebarNav navOpen={navOpen}>
        <LeftSidebarList>
          <Tree edges={edges} />
        </LeftSidebarList>
        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Button type="button" onClick={cycleColorMode}>
            <ToggleOpen fill="#000" />
          </Button>
        </p>
      </LeftSidebarNav>
    </LeftSidebarWrapper>
  );
};

const LeftSidebarWrapper = styled.aside`
  margin-left: -16rem;
  flex: 0 0 16rem;
  font-size: 0.875rem;
  ${mediaqueries.desktop_up`
    margin-left: 0;
  `};
`;

const LeftSidebarNav = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  width: 16rem;
  height: 100%;
  padding: 2rem 0;
  background: ${p => p.theme.colors.sidebar};
  transition: 0.25s var(--ease-in-out-quad);
  transform: ${p => (p.navOpen ? `translateX(16rem)` : null)};
  ${mediaqueries.desktop_up`
    transform: translateX(0)
  `};
`;

const LeftSidebarList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  > li > ul {
    margin: 0;
    padding: 0;
    border: 0;
  }
`;

LeftSidebar.propTypes = {
  navOpen: PropTypes.bool
};

export default LeftSidebar;