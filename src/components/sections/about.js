import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import awardImage from '../../images/award-2025.jpg';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const StyledAward = styled.div`
  margin-top: 20px;
  text-align: center;

  img {
    width: 100%;
    max-width: 360px;
    border-radius: 8px;
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Go',
    'Java / Spring Boot',
    'PostgreSQL / MongoDB',
    'Redis',
    'Kafka / RabbitMQ',
    'gRPC / WebSocket',
    'WebRTC',
    'Docker / Kubernetes',
    'React / TypeScript',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Thien. I’m a software engineer focused on building reliable backend
              systems and scalable real-time applications. I enjoy working on system-level problems
              where performance, correctness, and data consistency are critical.
            </p>

            <p>
              Over the past few years, I’ve built reward systems sustaining 5,000+ simultaneous
              requests, finance workflows processing $100K+ per month, data pipelines handling 1M+
              rows, and real-time chat, voice, and video features with WebSockets and WebRTC.
            </p>

            <p>
              Currently, I’m working as a{' '}
              <strong style={{ color: 'var(--green)' }}>Software Engineer</strong> at{' '}
              <strong style={{ color: 'var(--green)' }}>VinSmart Future</strong>, where I develop
              Java and Go backend services for loyalty, rewards, and promotions. Before that, I
              spent time at{' '}
              <a href="https://gearment.com/" target="_blank" rel="noreferrer">
                Gearment
              </a>
              , owning order lifecycle and finance workflows for a CRM/ERP back-office platform.
            </p>

            <p>
              <span role="img" aria-label="trophy">
                🏆
              </span>{' '}
              I'm honored to have received the{' '}
              <strong style={{ color: 'var(--green)' }}>Shining Treasure of the Year 2025</strong>{' '}
              award from Gearment, in recognition of outstanding dedication and contributions.
            </p>

            <StyledAward>
              <img
                src={awardImage}
                alt="Shining Treasure of the Year 2025 Award"
                loading="eager"
                decoding="async"
              />
            </StyledAward>

            <p>Here are some technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/about-avatar-2025.jpg"
              width={500}
              quality={100}
              placeholder="none"
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Thien Nguyen"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
