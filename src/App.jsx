import React, { useState } from 'react';
import { Menu, X, Bell, Settings, LogOut, Home, BookOpen, BarChart3, Award, ChevronRight, Star, Search, Play, Clock, Users, CheckCircle, ArrowLeft, FileQuestion, Plus, Edit, Trash2, Eye } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// COLORS - Matching the screenshot
// ═══════════════════════════════════════════════════════════════════════════════

const Colors = {
  bg: '#0f172a',
  surface: '#0f172a',
  card: '#1e293b',
  cardHover: '#334155',
  border: '#334155',
  primary: '#a78bfa',
  primaryLight: 'rgba(167, 139, 250, 0.2)',
  accent: '#38bdf8',
  success: '#4ade80',
  danger: '#f87171',
  warning: '#facc15',
  text: '#f1f5f9',
  textMuted: '#cbd5e1',
};

// ═══════════════════════════════════════════════════════════════════════════════
// COURSES DATA
// ═══════════════════════════════════════════════════════════════════════════════

const SEED_COURSES = [
  {
    id: 1,
    title: 'React for Beginners',
    instructor: 'David Ijah',
    category: 'Web Development',
    level: 'Beginner',
    rating: 4.8,
    students: 1230,
    price: '$48.99',
    image: '⚛️',
    color: '#38bdf8',
    description: 'Learn React from scratch',
    lessons: [
      { id: 1, title: 'Introduction', duration: '15 min', content: 'React basics' },
      { id: 2, title: 'Components', duration: '25 min', content: 'Building components' },
      { id: 3, title: 'Hooks', duration: '30 min', content: 'State management' },
      { id: 4, title: 'Routing', duration: '20 min', content: 'Navigation' },
    ],
    quiz: {
      questions: [
        { id: 1, question: 'What is React?', options: ['Library', 'Framework', 'Language', 'Database'], correct: 0 },
        { id: 2, question: 'What are hooks?', options: ['Functions', 'Classes', 'Components', 'Props'], correct: 0 },
        { id: 3, question: 'What is JSX?', options: ['JavaScript', 'XML syntax', 'Framework', 'Library'], correct: 1 },
        { id: 4, question: 'What is useState?', options: ['Hook', 'Component', 'Function', 'Class'], correct: 0 },
        { id: 5, question: 'What is useEffect?', options: ['Hook', 'Function', 'State', 'Props'], correct: 0 },
      ]
    }
  },
  {
    id: 2,
    title: 'Python Programming',
    instructor: 'Jane Smith',
    category: 'Programming',
    level: 'Beginner',
    rating: 4.7,
    students: 2300,
    price: '$59.99',
    image: '🐍',
    color: '#fbbf24',
    description: 'Master Python basics',
    lessons: [
      { id: 1, title: 'Basics', duration: '20 min', content: 'Variables and types' },
      { id: 2, title: 'Functions', duration: '25 min', content: 'Functions' },
    ],
    quiz: {
      questions: [
        { id: 1, question: 'What is Python?', options: ['Language', 'Snake', 'Framework', 'Tool'], correct: 0 },
        { id: 2, question: 'What is a function?', options: ['Variable', 'Code block', 'Class', 'Module'], correct: 1 },
      ]
    }
  },
  {
    id: 3,
    title: 'UI/UX Design Mastery',
    instructor: 'Mike Johnson',
    category: 'Design',
    level: 'Intermediate',
    rating: 4.9,
    students: 980,
    price: '$39.99',
    image: '🎨',
    color: '#e879f9',
    description: 'Create beautiful interfaces',
    lessons: [
      { id: 1, title: 'Principles', duration: '30 min', content: 'Design fundamentals' },
    ],
    quiz: {
      questions: [
        { id: 1, question: 'What is UX?', options: ['User Experience', 'User Interface', 'Design', 'Code'], correct: 0 },
      ]
    }
  },
  {
    id: 4,
    title: 'Data Science Basics',
    instructor: 'Sarah White',
    category: 'Data Science',
    level: 'Intermediate',
    rating: 4.6,
    students: 1560,
    price: '$54.99',
    image: '📊',
    color: '#4ade80',
    description: 'Learn data analysis',
    lessons: [
      { id: 1, title: 'Data Types', duration: '20 min', content: 'Data fundamentals' },
    ],
    quiz: {
      questions: [
        { id: 1, question: 'What is Big Data?', options: ['Large datasets', 'Files', 'Cloud', 'DB'], correct: 0 },
      ]
    }
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const Button = ({ children, variant = 'primary', onClick, disabled = false, fullWidth = false, icon: Icon, size = 'md' }) => {
  const variants = {
    primary: { bg: Colors.primary, color: '#000', border: 'none' },
    secondary: { bg: Colors.card, color: Colors.text, border: `1px solid ${Colors.border}` },
    ghost: { bg: 'transparent', color: Colors.text, border: `1px solid ${Colors.border}` },
  };

  const sizes = {
    sm: '8px 16px',
    md: '10px 20px',
    lg: '12px 24px',
  };

  const style = variants[variant];
  const padding = sizes[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding,
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '14px',
        border: style.border,
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.5 : 1,
        backgroundColor: style.bg,
        color: style.color,
        transition: 'all 0.2s',
        fontFamily: 'inherit'
      }}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

const Badge = ({ children, variant = 'primary', size = 'sm' }) => {
  const variants = {
    primary: { bg: Colors.primaryLight, color: Colors.primary },
    success: { bg: 'rgba(74, 222, 128, 0.2)', color: Colors.success },
    warning: { bg: 'rgba(250, 204, 21, 0.2)', color: Colors.warning },
  };

  const style = variants[variant];

  return (
    <span style={{
      display: 'inline-block',
      padding: size === 'sm' ? '4px 10px' : '6px 12px',
      borderRadius: '20px',
      fontSize: size === 'sm' ? '11px' : '12px',
      fontWeight: '600',
      backgroundColor: style.bg,
      color: style.color,
    }}>
      {children}
    </span>
  );
};

const ProgressBar = ({ value, color = Colors.primary, height = 6 }) => (
  <div style={{
    width: '100%',
    height,
    backgroundColor: Colors.border,
    borderRadius: '3px',
    overflow: 'hidden',
  }}>
    <div style={{
      width: `${value}%`,
      height: '100%',
      backgroundColor: color,
      transition: 'width 0.3s ease'
    }} />
  </div>
);

const CourseCard = ({ course, onSelect, enrolled = false, progress = 0, isAdmin = false }) => (
  <div
    onClick={onSelect}
    style={{
      backgroundColor: Colors.card,
      border: `1px solid ${Colors.border}`,
      borderRadius: '14px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.3s',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.borderColor = Colors.primary;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = Colors.border;
    }}
  >
    {/* Image Header */}
    <div style={{
      height: '140px',
      background: `linear-gradient(135deg, ${Colors.primary}80, ${Colors.accent}80)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '56px',
      position: 'relative'
    }}>
      {course.image}
      {enrolled && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: Colors.success,
          color: 'white',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: 'bold'
        }}>
          ✓ Enrolled
        </div>
      )}
    </div>

    {/* Content */}
    <div style={{ padding: '18px' }}>
      <div style={{ marginBottom: '10px' }}>
        <Badge variant="primary" size="sm">{course.level}</Badge>
      </div>
      <h3 style={{ margin: '8px 0', fontSize: '16px', fontWeight: '700', color: Colors.text, lineHeight: '1.4' }}>
        {course.title}
      </h3>
      <p style={{ fontSize: '12px', color: Colors.textMuted, marginBottom: '12px', lineHeight: '1.5' }}>
        {course.description}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '12px' }}>
        <span style={{ color: Colors.textMuted }}>⭐ {course.rating} ({course.students})</span>
        <span style={{ color: Colors.warning, fontWeight: 'bold' }}>{course.price}</span>
      </div>

      {enrolled && (
        <>
          <ProgressBar value={progress} color={Colors.primary} height={4} />
          <div style={{ marginTop: '8px', fontSize: '11px', color: Colors.textMuted }}>
            {progress}% Complete
          </div>
        </>
      )}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: LOGIN
// ═══════════════════════════════════════════════════════════════════════════════

const LoginPage = ({ onLogin }) => (
  <div style={{
    minHeight: '100vh',
    backgroundColor: Colors.bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(167, 139, 250, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(56, 189, 248, 0.15) 0%, transparent 50%)'
  }}>
    <div style={{ maxWidth: '450px', zIndex: 10, textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎓</div>
      <h1 style={{ fontSize: '40px', fontWeight: '800', marginBottom: '8px', color: Colors.text }}>
        LearnHub
      </h1>
      <p style={{ fontSize: '16px', color: Colors.textMuted, marginBottom: '50px' }}>
        Upgrade Your Skills. Unlock Your Future.
      </p>

      <div style={{ display: 'grid', gap: '14px' }}>
        <div
          onClick={() => onLogin({ id: 1, name: 'David Ijah', role: 'student', avatar: '👨‍💻' })}
          style={{
            backgroundColor: Colors.card,
            border: `1px solid ${Colors.border}`,
            borderRadius: '12px',
            padding: '18px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = Colors.cardHover;
            e.currentTarget.style.borderColor = Colors.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = Colors.card;
            e.currentTarget.style.borderColor = Colors.border;
          }}
        >
          <div style={{ fontSize: '32px' }}>👨‍💻</div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontWeight: '700', color: Colors.text, fontSize: '15px' }}>Continue as Student</div>
            <div style={{ fontSize: '12px', color: Colors.textMuted, marginTop: '2px' }}>Browse and take courses</div>
          </div>
          <ChevronRight size={20} color={Colors.primary} />
        </div>

        <div
          onClick={() => onLogin({ id: 2, name: 'Admin David', role: 'admin', avatar: '⚙️' })}
          style={{
            backgroundColor: Colors.card,
            border: `1px solid ${Colors.border}`,
            borderRadius: '12px',
            padding: '18px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = Colors.cardHover;
            e.currentTarget.style.borderColor = Colors.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = Colors.card;
            e.currentTarget.style.borderColor = Colors.border;
          }}
        >
          <div style={{ fontSize: '32px' }}>⚙️</div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontWeight: '700', color: Colors.text, fontSize: '15px' }}>Continue as Admin</div>
            <div style={{ fontSize: '12px', color: Colors.textMuted, marginTop: '2px' }}>Manage courses & content</div>
          </div>
          <ChevronRight size={20} color={Colors.primary} />
        </div>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SIDEBAR & HEADER
// ═══════════════════════════════════════════════════════════════════════════════

const Sidebar = ({ activeView, onNavigate, user, onLogout, isOpen, onToggle }) => (
  <>
    {isOpen && <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }} onClick={onToggle} />}

    <div style={{
      position: isOpen ? 'fixed' : 'relative',
      left: 0,
      top: 0,
      height: '100vh',
      width: '240px',
      backgroundColor: Colors.surface,
      borderRight: `1px solid ${Colors.border}`,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50,
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '20px', borderBottom: `1px solid ${Colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '24px', fontWeight: '800', color: Colors.primary, letterSpacing: '-0.5px' }}>📚 LearnHub</div>
        <Menu size={20} color={Colors.text} onClick={onToggle} style={{ cursor: 'pointer' }} />
      </div>

      {user && (
        <div style={{ padding: '16px', borderBottom: `1px solid ${Colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '28px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primaryLight, borderRadius: '8px' }}>
              {user.avatar}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: Colors.text }}>{user.name}</div>
              <div style={{ fontSize: '11px', color: Colors.textMuted, textTransform: 'capitalize', marginTop: '2px' }}>{user.role}</div>
            </div>
          </div>
        </div>
      )}

      <nav style={{ flex: 1, padding: '12px' }}>
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'courses', label: 'Courses', icon: BookOpen },
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Admin Panel', icon: Settings }] : []),
        ].map(item => {
          const ItemIcon = item.icon;
          const isActive = activeView === item.id;
          return (
            <div
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onToggle();
              }}
              style={{
                padding: '12px 14px',
                marginBottom: '6px',
                borderRadius: '8px',
                backgroundColor: isActive ? Colors.primaryLight : 'transparent',
                color: isActive ? Colors.primary : Colors.textMuted,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s',
                fontWeight: isActive ? '700' : '500',
                fontSize: '14px'
              }}
            >
              <ItemIcon size={18} />
              {item.label}
            </div>
          );
        })}
      </nav>

      <div style={{ padding: '12px', borderTop: `1px solid ${Colors.border}` }}>
        <Button variant="ghost" fullWidth onClick={onLogout} icon={LogOut} size="sm">
          Sign Out
        </Button>
      </div>
    </div>
  </>
);

const Header = ({ user, onMenuToggle }) => (
  <div style={{
    backgroundColor: Colors.surface,
    borderBottom: `1px solid ${Colors.border}`,
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Menu size={22} color={Colors.text} onClick={onMenuToggle} style={{ cursor: 'pointer' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: Colors.card, border: `1px solid ${Colors.border}`, borderRadius: '8px', padding: '10px 14px' }}>
        <Search size={18} color={Colors.textMuted} />
        <input
          type="text"
          placeholder="Search courses..."
          style={{
            background: 'none',
            border: 'none',
            color: Colors.text,
            fontSize: '13px',
            outline: 'none',
            width: '180px'
          }}
        />
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Bell size={18} color={Colors.textMuted} style={{ cursor: 'pointer' }} />
      <Settings size={18} color={Colors.textMuted} style={{ cursor: 'pointer' }} />
      <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: Colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
        {user?.avatar}
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: HOME
// ═══════════════════════════════════════════════════════════════════════════════

const HomePage = ({ courses, onSelectCourse, user, enrollments, courseProgress }) => {
  const stats = [
    { icon: '📚', label: 'Courses', value: enrollments.length },
    { icon: '⏱️', label: 'Hours', value: '24h' },
    { icon: '✅', label: 'Completion', value: '85%' },
    { icon: '🏆', label: 'Certificates', value: '3' },
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${Colors.primary}40, ${Colors.accent}40)`,
        border: `1px solid ${Colors.border}`,
        borderRadius: '16px',
        padding: '48px 40px',
        marginBottom: '40px',
      }}>
        <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '12px', color: Colors.text }}>
          Welcome back, {user?.name}! 👋
        </h1>
        <p style={{ fontSize: '16px', color: Colors.textMuted, marginBottom: '24px', maxWidth: '500px' }}>
          Continue your learning journey. Pick up where you left off.
        </p>
        <Button variant="primary">Browse Courses</Button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            backgroundColor: Colors.card,
            border: `1px solid ${Colors.border}`,
            borderRadius: '12px',
            padding: '20px',
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: Colors.text }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: Colors.textMuted, marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Featured */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: Colors.text }}>Featured Courses</h2>
          <a onClick={() => { }} style={{ color: Colors.primary, cursor: 'pointer', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>View All →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
          {courses.slice(0, 4).map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={() => onSelectCourse(course)}
              enrolled={enrollments.some(e => e.courseId === course.id)}
              progress={courseProgress(course.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: COURSES
// ═══════════════════════════════════════════════════════════════════════════════

const CoursesPage = ({ courses, onSelectCourse, enrollments, courseProgress }) => {
  const [category, setCategory] = useState('All');
  const categories = ['All', 'Web Development', 'Programming', 'Design', 'Data Science'];
  const filtered = courses.filter(c => category === 'All' || c.category === category);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '20px', color: Colors.text }}>All Courses</h1>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: `1px solid ${category === cat ? Colors.primary : Colors.border}`,
                backgroundColor: category === cat ? Colors.primaryLight : 'transparent',
                color: category === cat ? Colors.primary : Colors.textMuted,
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
        {filtered.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onSelect={() => onSelectCourse(course)}
            enrolled={enrollments.some(e => e.courseId === course.id)}
            progress={courseProgress(course.id)}
          />
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: COURSE DETAIL
// ═══════════════════════════════════════════════════════════════════════════════

const CourseDetailPage = ({ course, onSelectLesson, onStartQuiz, onEnroll, isEnrolled, progress, onBack }) => (
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: Colors.primary, cursor: 'pointer', marginBottom: '20px', fontSize: '14px', fontWeight: '600' }}>
      ← Back to Courses
    </button>

    {/* Header */}
    <div style={{
      background: `linear-gradient(135deg, ${Colors.primary}60, ${Colors.accent}60)`,
      border: `1px solid ${Colors.border}`,
      borderRadius: '16px',
      padding: '40px',
      marginBottom: '30px',
    }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>{course.image}</div>
      <Badge variant="warning" size="sm">Intermediate</Badge>
      <h1 style={{ fontSize: '38px', fontWeight: '800', margin: '16px 0 8px', color: Colors.text }}>{course.title}</h1>
      <p style={{ fontSize: '15px', color: Colors.textMuted, marginBottom: '16px' }}>{course.description}</p>
      <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
        <span>⭐ {course.rating} ({course.students.toLocaleString()} students)</span>
        <span>📚 {course.lessons.length} lessons</span>
      </div>
    </div>

    {/* Content Grid */}
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
      {/* Left - Lessons */}
      <div>
        <div style={{
          backgroundColor: Colors.card,
          border: `1px solid ${Colors.border}`,
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '18px 20px', borderBottom: `1px solid ${Colors.border}` }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: Colors.text }}>Course Content</h3>
          </div>
          {course.lessons.map((lesson, i) => (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson)}
              style={{
                padding: '14px 20px',
                borderBottom: i < course.lessons.length - 1 ? `1px solid ${Colors.border}` : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = Colors.cardHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: Colors.primaryLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: Colors.primary,
                fontWeight: '600',
                fontSize: '13px'
              }}>
                {i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: '600', fontSize: '13px', color: Colors.text }}>{lesson.title}</div>
              </div>
              <div style={{ fontSize: '12px', color: Colors.textMuted, whiteSpace: 'nowrap' }}>{lesson.duration}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right - CTA */}
      <div>
        {isEnrolled ? (
          <>
            <div style={{
              backgroundColor: Colors.card,
              border: `1px solid ${Colors.border}`,
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '44px', fontWeight: '800', color: Colors.primary, marginBottom: '4px' }}>
                {progress}%
              </div>
              <div style={{
                fontSize: '12px', color: Colors.textMuted, marginBottom: '16px' }}>Course Progress</div>
                  <ProgressBar value = { progress } color = {Colors.primary
              } height={6} />
            </div>

            <Button fullWidth onClick={onStartQuiz} variant="primary" size="lg">
              Take Quiz
            </Button>
          </>
        ) : (
          <>
            <div style={{
              backgroundColor: Colors.card,
              border: `1px solid ${Colors.border}`,
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: Colors.primary, marginBottom: '8px' }}>
                {course.price}
              </div>
              <div style={{ fontSize: '12px', color: Colors.textMuted }}>Course Access</div>
            </div>

            <Button fullWidth onClick={onEnroll} variant="primary" size="lg">
              Enroll Now
            </Button>
          </>
        )}

        <div style={{
          backgroundColor: Colors.card,
          border: `1px solid ${Colors.border}`,
          borderRadius: '12px',
          padding: '16px',
          marginTop: '16px',
          fontSize: '13px'
        }}>
          <div style={{ fontWeight: '600', color: Colors.text, marginBottom: '12px' }}>Course Includes:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: Colors.textMuted }}>
            <div>✓ {course.lessons.length} video lessons</div>
            <div>✓ Final quiz</div>
            <div>✓ Certificate</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: LESSON
// ═══════════════════════════════════════════════════════════════════════════════

const LessonPage = ({ lesson, course, onComplete, onBack }) => {
  const [completed, setCompleted] = useState(false);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: Colors.primary, cursor: 'pointer', marginBottom: '20px', fontSize: '13px', fontWeight: '600' }}>
        ← Back
      </button>

      <div style={{
        backgroundColor: Colors.card,
        border: `1px solid ${Colors.border}`,
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '24px'
      }}>
        <div style={{
          height: '360px',
          background: `linear-gradient(135deg, ${Colors.primary}80, ${Colors.accent}80)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontSize: '80px'
        }}>
          {course.image}
          {completed && <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: Colors.success, color: 'white', padding: '8px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>✓ Completed</div>}
          <div style={{ position: 'absolute', width: '70px', height: '70px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '3px solid rgba(255,255,255,0.8)' }}>
            <Play size={28} fill="white" color="white" />
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: Colors.card,
        border: `1px solid ${Colors.border}`,
        borderRadius: '12px',
        padding: '28px',
        marginBottom: '24px'
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px', color: Colors.text }}>{lesson.title}</h1>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', fontSize: '13px', color: Colors.textMuted }}>
          <span>⏱️ {lesson.duration}</span>
          <span>📚 {course.title}</span>
        </div>
        <p style={{ color: Colors.textMuted, lineHeight: '1.8', fontSize: '14px' }}>
          {lesson.content}
        </p>
      </div>

      <Button
        fullWidth
        onClick={() => {
          setCompleted(true);
          onComplete();
        }}
        variant="primary"
        size="lg"
      >
        {completed ? '✓ Lesson Completed' : 'Mark as Complete'}
      </Button>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: QUIZ
// ═══════════════════════════════════════════════════════════════════════════════

const QuizPage = ({ course, onSubmit, onBack }) => {
  const [answers, setAnswers] = useState({});
  const questions = course.quiz.questions || [];
  const isComplete = Object.keys(answers).length === questions.length;

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: Colors.primary, cursor: 'pointer', marginBottom: '20px', fontSize: '13px', fontWeight: '600' }}>
        ← Back
      </button>

      <div style={{
        backgroundColor: Colors.card,
        border: `1px solid ${Colors.border}`,
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '32px' }}>🎯</div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: Colors.text, marginBottom: '2px' }}>{course.title} — Quiz</h2>
            <p style={{ fontSize: '12px', color: Colors.textMuted }}>{questions.length} questions</p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: Colors.primary }}>{Object.keys(answers).length}/{questions.length}</div>
          </div>
        </div>
        <ProgressBar value={(Object.keys(answers).length / questions.length) * 100} color={Colors.primary} height={4} />
      </div>

      {questions.map((q, i) => (
        <div key={q.id} style={{
          backgroundColor: Colors.card,
          border: `1px solid ${Colors.border}`,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
            <div style={{
              minWidth: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: Colors.primaryLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: Colors.primary,
              fontWeight: '700',
              fontSize: '12px'
            }}>
              {i + 1}
            </div>
            <p style={{ fontSize: '15px', fontWeight: '600', color: Colors.text, lineHeight: '1.5' }}>{q.question}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '40px' }}>
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setAnswers(prev => ({ ...prev, [q.id]: idx }))}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: `1px solid ${answers[q.id] === idx ? Colors.primary : Colors.border}`,
                  backgroundColor: answers[q.id] === idx ? Colors.primaryLight : 'transparent',
                  color: answers[q.id] === idx ? Colors.primary : Colors.text,
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: answers[q.id] === idx ? '600' : '400',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ opacity: 0.6 }}>{'ABCD'[idx]}.</span> {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <Button
        fullWidth
        onClick={() => onSubmit(answers)}
        disabled={!isComplete}
        variant="primary"
        size="lg"
      >
        {isComplete ? 'Submit Quiz →' : `Answer all questions (${Object.keys(answers).length}/${questions.length})`}
      </Button>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: QUIZ RESULTS
// ═══════════════════════════════════════════════════════════════════════════════

const QuizResultsPage = ({ course, score, total, onBack, onContinue }) => {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  return (
    <div style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{
        backgroundColor: Colors.card,
        border: `1px solid ${Colors.border}`,
        borderRadius: '12px',
        padding: '40px 32px',
        marginBottom: '24px'
      }}>
        <div style={{ fontSize: '72px', marginBottom: '20px' }}>{passed ? '🎉' : '📚'}</div>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '8px', color: passed ? Colors.success : Colors.danger }}>
          {percentage}%
        </h1>
        <p style={{ fontSize: '20px', fontWeight: '700', color: Colors.text, marginBottom: '12px' }}>
          {passed ? 'Congratulations!' : 'Keep Learning!'}
        </p>
        <p style={{ fontSize: '14px', color: Colors.textMuted, marginBottom: '24px' }}>
          {passed ? `You passed the ${course.title} quiz!` : 'Review lessons and try again'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Correct', value: score, color: Colors.success },
            { label: 'Wrong', value: total - score, color: Colors.danger },
            { label: 'Total', value: total, color: Colors.primary },
          ].map((item, i) => (
            <div key={i} style={{
              backgroundColor: Colors.surface,
              borderRadius: '8px',
              padding: '12px',
            }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: item.color }}>{item.value}</div>
              <div style={{ fontSize: '11px', color: Colors.textMuted, marginTop: '2px' }}>{item.label}</div>
            </div>
          ))}
        </div>

        {passed && (
          <div style={{
            backgroundColor: Colors.primaryLight,
            border: `1px solid ${Colors.primary}`,
            borderRadius: '8px',
            padding: '14px',
          }}>
            <div style={{ color: Colors.primary, fontWeight: '700', fontSize: '14px' }}>
              🏆 Certificate Earned!
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button variant="ghost" fullWidth onClick={onBack} size="md">Back</Button>
        <Button fullWidth onClick={onContinue} variant="primary" size="md">Continue</Button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

const DashboardPage = ({ courses, enrollments, courseProgress }) => {
  const completedCount = 3;
  const stats = [
    { icon: '📚', label: 'Total Enrollments', value: enrollments.length },
    { icon: '⏳', label: 'In Progress', value: enrollments.length },
    { icon: '✅', label: 'Completed', value: completedCount },
    { icon: '🏆', label: 'Certificates', value: completedCount },
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '28px', color: Colors.text }}>Dashboard Overview</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            backgroundColor: Colors.card,
            border: `1px solid ${Colors.border}`,
            borderRadius: '12px',
            padding: '18px',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: Colors.text }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: Colors.textMuted, marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', color: Colors.text }}>Recent Courses</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {courses.slice(0, 4).map((course) => {
          const progress = courseProgress(course.id);
          return (
            <div key={course.id} style={{
              backgroundColor: Colors.card,
              border: `1px solid ${Colors.border}`,
              borderRadius: '12px',
              padding: '18px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ fontSize: '32px' }}>{course.image}</div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: Colors.text }}>{course.title}</div>
                  <div style={{ fontSize: '12px', color: Colors.textMuted }}>{course.instructor}</div>
                </div>
              </div>
              <ProgressBar value={progress} color={Colors.primary} height={4} />
              <div style={{ marginTop: '8px', fontSize: '11px', color: Colors.textMuted }}>{progress}% Complete</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: ADMIN
// ═══════════════════════════════════════════════════════════════════════════════

const AdminPage = ({ courses, setCourses, enrollments }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', instructor: '' });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: Colors.text }}>Course Management</h1>
        <Button onClick={() => setShowModal(true)} variant="primary">
          <Plus size={18} /> Add Course
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Total Courses', value: courses.length },
          { label: 'Enrollments', value: enrollments.length },
        ].map((stat, i) => (
          <div key={i} style={{
            backgroundColor: Colors.card,
            border: `1px solid ${Colors.border}`,
            borderRadius: '12px',
            padding: '18px'
          }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: Colors.primary }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: Colors.textMuted, marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: Colors.card,
        border: `1px solid ${Colors.border}`,
        borderRadius: '12px',
        padding: '20px',
        overflowX: 'auto'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: Colors.text }}>All Courses</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${Colors.border}` }}>
              <th style={{ textAlign: 'left', padding: '12px', fontSize: '12px', fontWeight: '700', color: Colors.textMuted }}>Course</th>
              <th style={{ textAlign: 'left', padding: '12px', fontSize: '12px', fontWeight: '700', color: Colors.textMuted }}>Instructor</th>
              <th style={{ textAlign: 'left', padding: '12px', fontSize: '12px', fontWeight: '700', color: Colors.textMuted }}>Enrollments</th>
              <th style={{ textAlign: 'center', padding: '12px', fontSize: '12px', fontWeight: '700', color: Colors.textMuted }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, i) => (
              <tr key={course.id} style={{ borderBottom: i < courses.length - 1 ? `1px solid ${Colors.border}` : 'none' }}>
                <td style={{ padding: '12px', fontSize: '13px', color: Colors.text }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>{course.image}</span>
                    {course.title}
                  </div>
                </td>
                <td style={{ padding: '12px', fontSize: '13px', color: Colors.text }}>{course.instructor}</td>
                <td style={{ padding: '12px', fontSize: '13px', color: Colors.text }}>
                  <Badge variant="success" size="sm">{enrollments.filter(e => e.courseId === course.id).length}</Badge>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => setCourses(courses.filter(c => c.id !== course.id))}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: Colors.danger,
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: Colors.surface, borderRadius: '12px', padding: '28px', maxWidth: '480px', width: '90%', border: `1px solid ${Colors.border}` }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: Colors.text }}>Add New Course</h2>
            <input type="text" placeholder="Course Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${Colors.border}`, backgroundColor: Colors.card, color: Colors.text, marginBottom: '12px', fontSize: '13px' }} />
            <input type="text" placeholder="Instructor" value={formData.instructor} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${Colors.border}`, backgroundColor: Colors.card, color: Colors.text, marginBottom: '20px', fontSize: '13px' }} />
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="ghost" fullWidth onClick={() => setShowModal(false)}>Cancel</Button>
              <Button fullWidth onClick={() => { if (formData.title) { setCourses([...courses, { id: Date.now(), ...formData, category: 'Web Development', level: 'Beginner', image: '🎓', color: Colors.primary, rating: 4.5, students: 0, price: '$49.99', description: 'New course', lessons: [], quiz: { questions: [] } }]); setShowModal(false); setFormData({ title: '', instructor: '' }); } }}>Add</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════

export default function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState(SEED_COURSES);
  const [enrollments, setEnrollments] = useState([{ courseId: 1, progress: 75 }]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  const isEnrolled = (courseId) => enrollments.some(e => e.courseId === courseId);
  const courseProgress = (courseId) => {
    const e = enrollments.find(en => en.courseId === courseId);
    return e?.progress || 0;
  };

  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = Colors.bg;
    document.body.style.color = Colors.text;
    document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    document.body.style.lineHeight = '1.6';
  }, []);

  if (currentView === 'login') {
    return <LoginPage onLogin={(u) => { setUser(u); setCurrentView('home'); }} />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: Colors.bg, color: Colors.text }}>
      <Sidebar
        activeView={currentView}
        onNavigate={setCurrentView}
        user={user}
        onLogout={() => { setUser(null); setCurrentView('login'); }}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header user={user} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <div style={{ flex: 1, overflow: 'auto', backgroundColor: Colors.bg }}>
          <div style={{ padding: '28px' }}>
            {currentView === 'home' && <HomePage courses={courses} onSelectCourse={(c) => { setSelectedCourse(c); setCurrentView('courseDetail'); }} user={user} enrollments={enrollments} courseProgress={courseProgress} />}

            {currentView === 'courses' && <CoursesPage courses={courses} onSelectCourse={(c) => { setSelectedCourse(c); setCurrentView('courseDetail'); }} enrollments={enrollments} courseProgress={courseProgress} />}

            {currentView === 'courseDetail' && selectedCourse && <CourseDetailPage course={selectedCourse} onSelectLesson={(l) => { setSelectedLesson(l); setCurrentView('lesson'); }} onStartQuiz={() => setCurrentView('quiz')} onEnroll={() => setEnrollments([...enrollments, { courseId: selectedCourse.id, progress: 0 }])} isEnrolled={isEnrolled(selectedCourse.id)} progress={courseProgress(selectedCourse.id)} onBack={() => setCurrentView('courses')} />}

            {currentView === 'lesson' && selectedLesson && selectedCourse && <LessonPage lesson={selectedLesson} course={selectedCourse} onComplete={() => setCurrentView('courseDetail')} onBack={() => setCurrentView('courseDetail')} />}

            {currentView === 'quiz' && selectedCourse && <QuizPage course={selectedCourse} onSubmit={(answers) => { let score = 0; selectedCourse.quiz.questions.forEach(q => { if (answers[q.id] === q.correct) score++; }); setQuizScore({ score, total: selectedCourse.quiz.questions.length }); setCurrentView('quizResults'); }} onBack={() => setCurrentView('courseDetail')} />}

            {currentView === 'quizResults' && selectedCourse && quizScore && <QuizResultsPage course={selectedCourse} score={quizScore.score} total={quizScore.total} onBack={() => setCurrentView('courseDetail')} onContinue={() => setCurrentView('courses')} />}

            {currentView === 'dashboard' && <DashboardPage courses={courses} enrollments={enrollments} courseProgress={courseProgress} />}

            {currentView === 'admin' && user?.role === 'admin' && <AdminPage courses={courses} setCourses={setCourses} enrollments={enrollments} />}
          </div>
        </div>
      </div>
    </div>
  );
}
