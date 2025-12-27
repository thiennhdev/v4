import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const Footer = () => 
// useEffect(() => {
//   // if (process.env.NODE_ENV !== 'production') {
//   //   return;
//   // }
//   fetch('https://api.github.com/repos/bchiang7/v4')
//     .then(response => response.json())
//     .then(json => {
//       const { stargazers_count, forks_count } = json;
//       setGitHubInfo({
//         stars: stargazers_count,
//         forks: forks_count,
//       });
//     })
//     .catch(e => console.error(e));
// }, []);

  (
    <StyledFooter>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>

      {/* <StyledCredit tabindex="-1">
        <a href="https://github.com/bchiang7/v4">
          <div>Designed &amp; Built by Thien Nguyen</div>

          {githubInfo.stars && githubInfo.forks && (
            <div className="github-stats">
              <span>
                <Icon name="Star" />
                <span>{githubInfo.stars.toLocaleString()}</span>
              </span>
              <span>
                <Icon name="Fork" />
                <span>{githubInfo.forks.toLocaleString()}</span>
              </span>
            </div>
          )}
        </a>
      </StyledCredit> */}
    </StyledFooter>
  )
;

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
