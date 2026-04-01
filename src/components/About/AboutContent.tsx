'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeixin } from '@fortawesome/free-brands-svg-icons';

import campusActivities from '@/data/about/campus';
import degrees from '@/data/about/degrees';
import projects from '@/data/about/projects';
import { categories, skills } from '@/data/about/skills';
import work from '@/data/about/work';

import SectionNav from './SectionNav';

const sections = [
  { id: 'profile', label: '个人信息' },
  { id: 'education', label: '教育背景' },
  { id: 'internships', label: '实习经历' },
  { id: 'projects', label: '项目经历' },
  { id: 'campus', label: '在校活动' },
  { id: 'skills', label: '技能' },
];

// 图标组件
function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// 联系方式项
interface ContactItemProps {
  type: 'email' | 'phone' | 'wechat';
  value: string;
  label: string;
}

function ContactItem({ type, value, label }: ContactItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 复制失败时不做任何事
    }
  };

  return (
    <div className="contact-item-wrapper">
      <button
        type="button"
        className="contact-icon-btn"
        onClick={handleCopy}
        aria-label={`复制${label}: ${value}`}
      >
        {copied ? (
          <CheckIcon className="contact-icon-check" />
        ) : type === 'wechat' ? (
          <FontAwesomeIcon icon={faWeixin} className="contact-fa-icon" />
        ) : type === 'email' ? (
          <EmailIcon />
        ) : (
          <PhoneIcon />
        )}
      </button>
      <span className="contact-value">{value}</span>
      {copied && <span className="contact-copy-toast">已复制</span>}
    </div>
  );
}

export default function AboutContent() {
  return (
    <div className="about-content-layout">
      <SectionNav sections={sections} />

      <div className="about-sections">
        {/* Profile */}
        <section id="profile" className="about-section">
          <h2 className="about-section-title">个人信息</h2>

          {/* 基础信息栏 */}
          <div className="profile-basic-info">
            <div className="profile-avatar">
              <img src="/images/me.jpg" alt="田昊琦" />
            </div>
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <span className="profile-info-label">姓名</span>
                <span className="profile-info-value">田昊琦</span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">出生年月</span>
                <span className="profile-info-value">2002年12月</span>
              </div>
              <div className="profile-info-item profile-info-fullwidth">
                <span className="profile-info-label">联系方式</span>
                <div className="profile-contact-icons">
                  <ContactItem type="email" value="cathytian@zju.edu.cn" label="邮箱" />
                  <ContactItem type="phone" value="(+86)19357571423" label="电话" />
                  <ContactItem type="wechat" value="taozi200212" label="微信" />
                </div>
              </div>
            </div>
          </div>

          <div className="profile-intro">
            {/* 个人简介内容 */}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="about-section">
          <h2 className="about-section-title">教育背景</h2>
          <div className="education-list">
            {degrees.map((degree, index) => (
              <div key={degree.school + degree.year} className="education-item">
                <div className="education-header">
                  <h3 className="education-school">{degree.school}</h3>
                  <span className="education-year">{degree.year}</span>
                </div>
                <p className="education-degree">
                  {index === 0 ? '硕士，' : '学士，'}
                  {degree.degree}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Internships */}
        <section id="internships" className="about-section">
          <h2 className="about-section-title">实习经历</h2>
          <div className="internships-list">
            {work.map((job) => (
              <div key={job.name + job.startDate} className="internship-item">
                <div className="internship-header">
                  <h3 className="internship-company">{job.name}</h3>
                  <span className="internship-date">
                    {job.startDate.replace(/-/g, '.')} - {job.endDate ? job.endDate.replace(/-/g, '.') : '至今'}
                  </span>
                </div>
                <p className="internship-position">{job.position}</p>
                <p className="internship-summary">{job.summary}</p>
                {job.highlights && (
                  <ul className="internship-highlights">
                    {job.highlights.map((highlight, idx) => {
                      const colonIndex = highlight.indexOf('：');
                      if (colonIndex === -1) {
                        return <li key={idx}>{highlight}</li>;
                      }
                      const title = highlight.slice(0, colonIndex);
                      const content = highlight.slice(colonIndex + 1);
                      return (
                        <li key={idx}>
                          <strong className="highlight-title">{title}</strong>：{content}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="about-section">
          <h2 className="about-section-title">项目经历</h2>
          <div className="projects-list">
            {projects.map((project) => (
              <div key={project.id} className="project-item">
                <div className="project-header">
                  <h3 className="project-name">{project.name}</h3>
                  <span className="project-date">{project.duration}</span>
                </div>
                <p className="project-role">{project.role}</p>
                <p className="project-description">{project.description}</p>
                <ul className="project-highlights">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="project-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Campus Activities */}
        <section id="campus" className="about-section">
          <h2 className="about-section-title">在校活动</h2>
          <div className="campus-list">
            {campusActivities.map((activity) => (
              <div key={activity.id} className="campus-item">
                <div className="campus-header">
                  <h3 className="campus-role">{activity.role}</h3>
                  <span className="campus-date">{activity.duration}</span>
                </div>
                <p className="campus-org">{activity.organization}</p>
                <p className="campus-description">{activity.description}</p>
                <ul className="campus-achievements">
                  {activity.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="about-section">
          <h2 className="about-section-title">技能</h2>
          <div className="skills-grid">
            {categories.map((category) => {
              const categorySkills = skills.filter((s) =>
                s.category.includes(category.name),
              );
              if (categorySkills.length === 0) return null;

              return (
                <div key={category.name} className="skills-category">
                  <h3
                    className="skills-category-title"
                    style={{
                      backgroundColor: category.color,
                      color: category.textColor === 'light' ? '#fff' : '#1d1d1f',
                    }}
                  >
                    {category.name}
                  </h3>
                  <div className="skills-list">
                    {categorySkills.map((skill) => (
                      <span key={skill.title} className="skill-tag">
                        {skill.title}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
