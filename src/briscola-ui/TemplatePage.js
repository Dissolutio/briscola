import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import GithubCorner from 'react-github-corner';

import HelpModal from './HelpModal.js';
import { LanguageSelect } from './LanguageSelect';
import '../styles/templatePage.css';

class TemplatePage extends Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
  }

  toggleModal = (isOpen) => {
    this.setState({ modalIsOpen: isOpen });
  };

  render() {
    return (
      <div className="full_height">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logo">
            <img
              src={'/images/briscolaLogoTransparentColor.png'}
              alt={'briscola-logo'}
            />
          </div>
        </Link>
        {this.props.content}
        <GithubCorner
          href={'https://github.com/aflorj/briscola'}
          target={'_blank'}
          bannerColor="#F0F0F0"
          octoColor="#696969"
          size={70}
          direction="left"
        />
        <div id="top-wrapper">
          <button
            className="lang-button"
            onClick={() => this.toggleModal(true)}
          >
            <Trans>Help</Trans>
          </button>
          <span id="slash">/</span>
          <LanguageSelect />
        </div>
        <HelpModal
          modalState={this.state.modalIsOpen}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}

export default TemplatePage;
