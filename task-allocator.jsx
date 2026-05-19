import React, { useState, useEffect, useMemo } from 'react';
import {
  Users, ListTodo, Heart, Scale, BarChart3,
  Plus, X, Trash2, Brain, Activity, Clock,
  Sparkles, ArrowRightLeft, Check, AlertCircle,
  Info, RotateCcw, Calendar, ChevronDown, ChevronRight
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

// ============================================================
// DESIGN TOKENS
// ============================================================
const T = {
  bg: '#F7F4EE',
  card: '#FFFFFF',
  ink: '#1A1916',
  inkSoft: '#635F58',
  inkSofter: '#8B867E',
  line: '#E8E2D6',
  lineSoft: '#F0EBE0',
  a: '#4A7C74',
  aLight: '#E2EBE8',
  aLighter: '#F0F5F3',
  b: '#B36648',
  bLight: '#EFDDD2',
  bLighter: '#F8EFE9',
  warn: '#C29032',
  warnLight: '#F5EBD4'
};

const FONTS_LINK = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';

// ============================================================
// SEED DATA
// ============================================================
const SEED_TASKS = [
  { id: 't1', name: 'Cook weeknight dinner', physicalEffort: 2, cognitiveEffort: 3, durationMinutes: 45, frequencyPerWeek: 5, flexibility: 3, recurrenceType: 'regular', isMentalLoad: false },
  { id: 't2', name: 'Empty dishwasher', physicalEffort: 1, cognitiveEffort: 1, durationMinutes: 5, frequencyPerWeek: 5, flexibility: 4, recurrenceType: 'regular', isMentalLoad: false },
  { id: 't3', name: 'Hoover floors', physicalEffort: 3, cognitiveEffort: 1, durationMinutes: 25, frequencyPerWeek: 1, flexibility: 5, recurrenceType: 'regular', isMentalLoad: false },
  { id: 't4', name: 'Clean bathroom', physicalEffort: 3, cognitiveEffort: 1, durationMinutes: 30, frequencyPerWeek: 1, flexibility: 5, recurrenceType: 'regular', isMentalLoad: false },
  { id: 't5', name: 'Laundry — washing', physicalEffort: 1, cognitiveEffort: 1, durationMinutes: 10, frequencyPerWeek: 2, flexibility: 4, recurrenceType: 'regular', isMentalLoad: false },
  { id: 't6', name: 'Laundry — folding & putting away', physicalEffort: 1, cognitiveEffort: 1, durationMinutes: 20, frequencyPerWeek: 2, flexibility: 5, recurrenceType: 'regular', isMentalLoad: false },
  { id: 't7', name: 'Bins out', physicalEffort: 2, cognitiveEffort: 1, durationMinutes: 5, frequencyPerWeek: 1, flexibility: 1, recurrenceType: 'regular', isMentalLoad: false },
  { id: 't8', name: 'Food shop', physicalEffort: 2, cognitiveEffort: 2, durationMinutes: 60, frequencyPerWeek: 1, flexibility: 3, recurrenceType: 'regular', isMentalLoad: false },
  { id: 't9', name: 'Tidy living room', physicalEffort: 1, cognitiveEffort: 1, durationMinutes: 10, frequencyPerWeek: 4, flexibility: 5, recurrenceType: 'regular', isMentalLoad: false },
  { id: 't10', name: 'Cat litter', physicalEffort: 2, cognitiveEffort: 1, durationMinutes: 5, frequencyPerWeek: 7, flexibility: 3, recurrenceType: 'regular', isMentalLoad: false },
  { id: 't11', name: 'Plant care', physicalEffort: 1, cognitiveEffort: 2, durationMinutes: 15, frequencyPerWeek: 2, flexibility: 4, recurrenceType: 'regular', isMentalLoad: false },
  { id: 't12', name: 'Meal planning & shopping list', physicalEffort: 1, cognitiveEffort: 4, durationMinutes: 20, frequencyPerWeek: 1, flexibility: 4, recurrenceType: 'regular', isMentalLoad: true },
  { id: 't13', name: 'Bills & admin', physicalEffort: 1, cognitiveEffort: 4, durationMinutes: 30, frequencyPerWeek: 1, flexibility: 4, recurrenceType: 'regular', isMentalLoad: true },
  { id: 't14', name: 'Track appointments & deadlines', physicalEffort: 1, cognitiveEffort: 4, durationMinutes: 15, frequencyPerWeek: 1, flexibility: 5, recurrenceType: 'regular', isMentalLoad: true },
  { id: 't15', name: 'Change bedding', physicalEffort: 3, cognitiveEffort: 1, durationMinutes: 15, frequencyPerWeek: 0.5, flexibility: 5, recurrenceType: 'regular', isMentalLoad: false }
];

const DEFAULT_STATE = {
  people: [
    { id: 'a', name: 'Ed', weights: { aversion: 40, effort: 30, time: 30 } },
    { id: 'b', name: 'Partner', weights: { aversion: 40, effort: 30, time: 30 } }
  ],
  tasks: SEED_TASKS,
  preferences: { a: {}, b: {} },
  bids: { a: {}, b: {} },
  assignments: {},
  transferLog: [],
  completions: [],
  exceptional: [],
  weekStart: null,
  isSeedData: true
};

// ============================================================
// COMPUTATION
// ============================================================
const normalizeWeights = (w) => {
  const sum = w.aversion + w.effort + w.time;
  if (sum === 0) return { aversion: 1/3, effort: 1/3, time: 1/3 };
  return { aversion: w.aversion/sum, effort: w.effort/sum, time: w.time/sum };
};

const aversionFromRating = (rating) => (6 - (rating ?? 3)) / 5;

const effortScore = (task) => (task.physicalEffort + task.cognitiveEffort) / 10;

const timeScore = (task) => {
  const weeklyMin = task.durationMinutes * task.frequencyPerWeek;
  const flexPenalty = 1 + (5 - task.flexibility) * 0.1;
  return Math.min((weeklyMin * flexPenalty) / 300, 1);
};

const compositeScore = (task, person, preferenceRating) => {
  const w = normalizeWeights(person.weights);
  const a = aversionFromRating(preferenceRating);
  const e = effortScore(task);
  const t = timeScore(task);
  return w.aversion * a + w.effort * e + w.time * t;
};

const totalBudget = (bids, personId) => 
  Object.values(bids[personId] || {}).reduce((s, v) => s + (Number(v) || 0), 0);

const runAllocation = (tasks, people, preferences, bids, tolerance = 0.15) => {
  const [pA, pB] = people;
  const assignments = {};
  
  // Step 1: Initial allocation by highest bidder
  tasks.forEach(t => {
    const bA = Number(bids[pA.id]?.[t.id]) || 0;
    const bB = Number(bids[pB.id]?.[t.id]) || 0;
    if (bA > bB) assignments[t.id] = pA.id;
    else if (bB > bA) assignments[t.id] = pB.id;
    else assignments[t.id] = null;
  });
  
  // Resolve ties: alternate
  const ties = tasks.filter(t => assignments[t.id] === null);
  ties.forEach((t, i) => { assignments[t.id] = i % 2 === 0 ? pA.id : pB.id; });
  
  const burdenOf = (pid) => {
    const person = people.find(p => p.id === pid);
    return tasks
      .filter(t => assignments[t.id] === pid)
      .reduce((s, t) => s + compositeScore(t, person, preferences[pid]?.[t.id]), 0);
  };
  
  const transferLog = [];
  for (let i = 0; i < 50; i++) {
    const bA = burdenOf(pA.id);
    const bB = burdenOf(pB.id);
    const total = bA + bB;
    if (total === 0) break;
    const ratioA = bA / total;
    if (Math.abs(ratioA - 0.5) <= tolerance / 2) break;
    
    const overId = bA > bB ? pA.id : pB.id;
    const underId = bA > bB ? pB.id : pA.id;
    
    const candidates = tasks
      .filter(t => assignments[t.id] === overId)
      .map(t => ({
        task: t,
        margin: (Number(bids[overId]?.[t.id]) || 0) - (Number(bids[underId]?.[t.id]) || 0)
      }))
      .sort((a, b) => a.margin - b.margin);
    
    if (candidates.length === 0) break;
    const { task: toTransfer, margin } = candidates[0];
    
    // Check if transfer overcorrects worse than current state
    assignments[toTransfer.id] = underId;
    const nA = burdenOf(pA.id);
    const nB = burdenOf(pB.id);
    const nTotal = nA + nB;
    const nRatio = nA / nTotal;
    if (Math.abs(nRatio - 0.5) > Math.abs(ratioA - 0.5)) {
      // overcorrected worse — undo and stop
      assignments[toTransfer.id] = overId;
      break;
    }
    transferLog.push({
      taskId: toTransfer.id,
      taskName: toTransfer.name,
      from: overId,
      to: underId,
      margin
    });
  }
  
  return { assignments, transferLog };
};

// ============================================================
// SHARED UI COMPONENTS
// ============================================================
const Card = ({ children, style = {}, ...props }) => (
  <div style={{
    background: T.card,
    borderRadius: 12,
    border: `1px solid ${T.line}`,
    padding: 24,
    ...style
  }} {...props}>{children}</div>
);

const SectionTitle = ({ icon: Icon, children, subtitle }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: subtitle ? 6 : 0 }}>
      {Icon && <Icon size={18} style={{ color: T.inkSoft }} />}
      <h2 style={{
        fontFamily: 'Fraunces, serif',
        fontSize: 22,
        fontWeight: 500,
        color: T.ink,
        margin: 0,
        letterSpacing: '-0.01em'
      }}>{children}</h2>
    </div>
    {subtitle && <p style={{ color: T.inkSoft, fontSize: 14, margin: 0, lineHeight: 1.5 }}>{subtitle}</p>}
  </div>
);

const PersonBadge = ({ person, isA }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '3px 10px',
    background: isA ? T.aLighter : T.bLighter,
    color: isA ? T.a : T.b,
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 500
  }}>
    <span style={{
      width: 6, height: 6, borderRadius: '50%',
      background: isA ? T.a : T.b
    }} />
    {person.name}
  </span>
);

const Button = ({ children, primary, danger, small, style = {}, ...props }) => (
  <button
    {...props}
    style={{
      padding: small ? '6px 12px' : '9px 16px',
      fontSize: small ? 13 : 14,
      fontWeight: 500,
      fontFamily: 'inherit',
      borderRadius: 8,
      border: primary ? 'none' : `1px solid ${T.line}`,
      background: primary ? T.ink : danger ? '#fff' : '#fff',
      color: primary ? '#fff' : danger ? T.b : T.ink,
      cursor: 'pointer',
      transition: 'all 0.15s',
      ...style
    }}
    onMouseEnter={(e) => {
      if (primary) e.target.style.background = '#000';
      else if (danger) e.target.style.background = T.bLighter;
      else e.target.style.background = T.lineSoft;
    }}
    onMouseLeave={(e) => {
      if (primary) e.target.style.background = T.ink;
      else e.target.style.background = '#fff';
    }}
  >{children}</button>
);

const NumberInput = ({ value, onChange, min, max, step = 1, style = {} }) => (
  <input
    type="number"
    value={value ?? ''}
    onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
    min={min} max={max} step={step}
    style={{
      padding: '6px 10px',
      fontSize: 14,
      fontFamily: 'JetBrains Mono, monospace',
      border: `1px solid ${T.line}`,
      borderRadius: 6,
      background: '#fff',
      color: T.ink,
      width: 70,
      textAlign: 'center',
      ...style
    }}
  />
);

const Slider = ({ value, onChange, min = 1, max = 5, color = T.ink }) => (
  <input
    type="range"
    value={value} min={min} max={max} step={1}
    onChange={(e) => onChange(Number(e.target.value))}
    style={{
      width: '100%',
      accentColor: color,
      cursor: 'pointer'
    }}
  />
);

// ============================================================
// TAB: SETUP
// ============================================================
const SetupTab = ({ state, setState }) => {
  const updatePerson = (idx, field, value) => {
    const newPeople = [...state.people];
    newPeople[idx] = { ...newPeople[idx], [field]: value };
    setState({ ...state, people: newPeople });
  };
  
  const updateWeight = (idx, dim, value) => {
    const newPeople = [...state.people];
    newPeople[idx] = {
      ...newPeople[idx],
      weights: { ...newPeople[idx].weights, [dim]: value }
    };
    setState({ ...state, people: newPeople });
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card>
        <SectionTitle
          icon={Users}
          subtitle="The two people the system divides work between. Names can be anything — these are just labels."
        >Who's involved</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {state.people.map((p, idx) => (
            <div key={p.id}>
              <label style={{
                fontSize: 13, color: T.inkSoft, marginBottom: 6, display: 'block',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: idx === 0 ? T.a : T.b
                }} />
                Person {idx === 0 ? 'A' : 'B'}
              </label>
              <input
                type="text"
                value={p.name}
                onChange={(e) => updatePerson(idx, 'name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  fontSize: 15,
                  fontFamily: 'inherit',
                  border: `1px solid ${T.line}`,
                  borderRadius: 8,
                  background: '#fff',
                  color: T.ink,
                  boxSizing: 'border-box'
                }}
              />
            </div>
          ))}
        </div>
      </Card>
      
      <Card>
        <SectionTitle
          icon={Scale}
          subtitle="Each person sets their own weights based on their scarcest resource. The numbers don't need to sum to 100 — relative ratios are what matter."
        >Burden weights</SectionTitle>
        
        <div style={{
          padding: 14, background: T.lineSoft, borderRadius: 8,
          fontSize: 13, color: T.inkSoft, marginBottom: 20,
          display: 'flex', gap: 10, alignItems: 'flex-start'
        }}>
          <Info size={16} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong style={{ color: T.ink, fontWeight: 500 }}>Aversion</strong> — how much you dislike a task matters. {' '}
            <strong style={{ color: T.ink, fontWeight: 500 }}>Effort</strong> — physical and mental load. {' '}
            <strong style={{ color: T.ink, fontWeight: 500 }}>Time</strong> — clock hours and scheduling friction.
            Set weights higher for whichever is your scarcest resource right now.
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {state.people.map((p, idx) => {
            const norm = normalizeWeights(p.weights);
            const accent = idx === 0 ? T.a : T.b;
            return (
              <div key={p.id}>
                <div style={{ marginBottom: 16 }}>
                  <PersonBadge person={p} isA={idx === 0} />
                </div>
                {[
                  { key: 'aversion', label: 'Aversion', icon: Heart },
                  { key: 'effort', label: 'Effort', icon: Brain },
                  { key: 'time', label: 'Time', icon: Clock }
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key} style={{ marginBottom: 16 }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: 6
                    }}>
                      <span style={{
                        fontSize: 14, color: T.inkSoft,
                        display: 'flex', alignItems: 'center', gap: 6
                      }}>
                        <Icon size={14} /> {label}
                      </span>
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 13, color: T.ink, fontWeight: 500
                      }}>
                        {Math.round(norm[key] * 100)}%
                      </span>
                    </div>
                    <input
                      type="range" min={0} max={100} step={5}
                      value={p.weights[key]}
                      onChange={(e) => updateWeight(idx, key, Number(e.target.value))}
                      style={{ width: '100%', accentColor: accent, cursor: 'pointer' }}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Card>
      
      {state.isSeedData && (
        <Card style={{ background: T.warnLight, borderColor: T.warn + '40' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <AlertCircle size={20} style={{ color: T.warn, flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 500,
                margin: '0 0 6px', color: T.ink
              }}>You're working with example data</h3>
              <p style={{ fontSize: 14, color: T.inkSoft, margin: '0 0 12px', lineHeight: 1.5 }}>
                The task list contains common household examples. Edit them on the Tasks tab to match your actual situation, or clear and start fresh.
              </p>
              <Button onClick={() => {
                if (confirm('Clear all tasks and start with an empty list?')) {
                  setState({
                    ...state,
                    tasks: [],
                    preferences: { a: {}, b: {} },
                    bids: { a: {}, b: {} },
                    assignments: {},
                    transferLog: [],
                    isSeedData: false
                  });
                }
              }}>Clear example data</Button>
              <Button
                style={{ marginLeft: 8 }}
                onClick={() => setState({ ...state, isSeedData: false })}
              >Keep and customise</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

// ============================================================
// TAB: TASKS
// ============================================================
const TaskRow = ({ task, onUpdate, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const weeklyMin = task.durationMinutes * task.frequencyPerWeek;
  
  return (
    <div style={{
      border: `1px solid ${T.line}`,
      borderRadius: 10,
      background: '#fff',
      overflow: 'hidden'
    }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
          background: expanded ? T.lineSoft : 'transparent'
        }}
      >
        {expanded ? <ChevronDown size={16} style={{ color: T.inkSoft }} /> : <ChevronRight size={16} style={{ color: T.inkSoft }} />}
        <span style={{ flex: 1, fontSize: 15, color: T.ink, fontWeight: 500 }}>{task.name}</span>
        {task.isMentalLoad && (
          <span style={{
            fontSize: 11, padding: '2px 8px',
            background: T.aLighter, color: T.a,
            borderRadius: 999, fontWeight: 500
          }}>mental load</span>
        )}
        <span style={{
          fontSize: 12, color: T.inkSofter,
          fontFamily: 'JetBrains Mono, monospace'
        }}>
          {Math.round(weeklyMin)} min/wk
        </span>
      </div>
      
      {expanded && (
        <div style={{ padding: 16, borderTop: `1px solid ${T.line}`, background: '#fff' }}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, color: T.inkSoft, marginBottom: 4, display: 'block' }}>Name</label>
            <input
              type="text"
              value={task.name}
              onChange={(e) => onUpdate({ ...task, name: e.target.value })}
              style={{
                width: '100%', padding: '8px 12px', fontSize: 14,
                fontFamily: 'inherit', border: `1px solid ${T.line}`,
                borderRadius: 6, boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
            <div>
              <label style={{
                fontSize: 13, color: T.inkSoft, marginBottom: 6,
                display: 'flex', justifyContent: 'space-between'
              }}>
                <span><Activity size={12} style={{ display: 'inline', marginRight: 4 }} />Physical effort</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{task.physicalEffort}/5</span>
              </label>
              <Slider value={task.physicalEffort} onChange={(v) => onUpdate({ ...task, physicalEffort: v })} />
            </div>
            <div>
              <label style={{
                fontSize: 13, color: T.inkSoft, marginBottom: 6,
                display: 'flex', justifyContent: 'space-between'
              }}>
                <span><Brain size={12} style={{ display: 'inline', marginRight: 4 }} />Cognitive effort</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{task.cognitiveEffort}/5</span>
              </label>
              <Slider value={task.cognitiveEffort} onChange={(v) => onUpdate({ ...task, cognitiveEffort: v })} />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: T.inkSoft, marginBottom: 4, display: 'block' }}>
                Duration (min)
              </label>
              <NumberInput
                value={task.durationMinutes}
                onChange={(v) => onUpdate({ ...task, durationMinutes: v || 0 })}
                min={0} style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, color: T.inkSoft, marginBottom: 4, display: 'block' }}>
                Per week
              </label>
              <NumberInput
                value={task.frequencyPerWeek}
                onChange={(v) => onUpdate({ ...task, frequencyPerWeek: v || 0 })}
                min={0} step={0.5} style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{
                fontSize: 13, color: T.inkSoft, marginBottom: 6,
                display: 'flex', justifyContent: 'space-between'
              }}>
                <span>Flexibility</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{task.flexibility}/5</span>
              </label>
              <Slider value={task.flexibility} onChange={(v) => onUpdate({ ...task, flexibility: v })} />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12 }}>
            <label style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 13, color: T.inkSoft, cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={task.isMentalLoad}
                onChange={(e) => onUpdate({ ...task, isMentalLoad: e.target.checked })}
              />
              Mental load task (anticipating, scheduling, remembering)
            </label>
          </div>
          
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <label style={{ fontSize: 13, color: T.inkSoft, display: 'flex', gap: 8, alignItems: 'center' }}>
              Recurrence:
              <select
                value={task.recurrenceType}
                onChange={(e) => onUpdate({ ...task, recurrenceType: e.target.value })}
                style={{
                  padding: '4px 8px', fontSize: 13, fontFamily: 'inherit',
                  border: `1px solid ${T.line}`, borderRadius: 6
                }}
              >
                <option value="regular">Regular</option>
                <option value="irregular">Irregular</option>
              </select>
            </label>
            <div style={{ marginLeft: 'auto' }}>
              <Button danger small onClick={() => onDelete(task.id)}>
                <Trash2 size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TasksTab = ({ state, setState }) => {
  const updateTask = (updated) => {
    setState({
      ...state,
      tasks: state.tasks.map(t => t.id === updated.id ? updated : t)
    });
  };
  
  const deleteTask = (id) => {
    if (!confirm('Delete this task?')) return;
    const newPrefs = { a: { ...state.preferences.a }, b: { ...state.preferences.b } };
    const newBids = { a: { ...state.bids.a }, b: { ...state.bids.b } };
    delete newPrefs.a[id]; delete newPrefs.b[id];
    delete newBids.a[id]; delete newBids.b[id];
    setState({
      ...state,
      tasks: state.tasks.filter(t => t.id !== id),
      preferences: newPrefs,
      bids: newBids
    });
  };
  
  const addTask = () => {
    const newTask = {
      id: `t${Date.now()}`,
      name: 'New task',
      physicalEffort: 2,
      cognitiveEffort: 2,
      durationMinutes: 15,
      frequencyPerWeek: 1,
      flexibility: 3,
      recurrenceType: 'regular',
      isMentalLoad: false
    };
    setState({ ...state, tasks: [...state.tasks, newTask] });
  };
  
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <SectionTitle
          icon={ListTodo}
          subtitle="Score each task on physical effort, cognitive effort, time, and flexibility. Mental load tasks make invisible work visible."
        >Task library</SectionTitle>
        <Button primary onClick={addTask}>
          <Plus size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />Add task
        </Button>
      </div>
      
      {state.tasks.length === 0 ? (
        <div style={{
          padding: 40, textAlign: 'center', color: T.inkSoft,
          background: T.lineSoft, borderRadius: 10
        }}>
          No tasks yet. Click "Add task" to create your first one.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {state.tasks.map(t => (
            <TaskRow key={t.id} task={t} onUpdate={updateTask} onDelete={deleteTask} />
          ))}
        </div>
      )}
    </Card>
  );
};

// ============================================================
// TAB: PREFERENCES (RATINGS)
// ============================================================
const PreferencesTab = ({ state, setState }) => {
  const setRating = (personId, taskId, rating) => {
    setState({
      ...state,
      preferences: {
        ...state.preferences,
        [personId]: { ...state.preferences[personId], [taskId]: rating }
      }
    });
  };
  
  const RatingPicker = ({ value, onChange, color }) => (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          onClick={() => onChange(n)}
          style={{
            width: 28, height: 28,
            borderRadius: 6,
            border: `1px solid ${value === n ? color : T.line}`,
            background: value === n ? color : '#fff',
            color: value === n ? '#fff' : T.inkSoft,
            cursor: 'pointer',
            fontSize: 13,
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 500,
            transition: 'all 0.15s'
          }}
        >{n}</button>
      ))}
    </div>
  );
  
  return (
    <Card>
      <SectionTitle
        icon={Heart}
        subtitle="Each person rates every task 1–5 (1 = hate it, 5 = love it / happy to keep it). This feeds the aversion score in the burden calculation — it doesn't decide allocation directly."
      >Preference ratings</SectionTitle>
      
      {state.tasks.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: T.inkSoft }}>
          Add tasks first on the Tasks tab.
        </div>
      ) : (
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, color: T.inkSoft, fontWeight: 500, borderBottom: `1px solid ${T.line}` }}>Task</th>
                {state.people.map((p, i) => (
                  <th key={p.id} style={{
                    textAlign: 'center', padding: '8px 12px',
                    fontSize: 12, fontWeight: 500,
                    color: i === 0 ? T.a : T.b,
                    borderBottom: `1px solid ${T.line}`
                  }}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.tasks.map(t => (
                <tr key={t.id}>
                  <td style={{
                    padding: '10px 12px',
                    fontSize: 14, color: T.ink,
                    borderBottom: `1px solid ${T.lineSoft}`
                  }}>
                    {t.name}
                    {t.isMentalLoad && (
                      <span style={{
                        fontSize: 10, marginLeft: 8, padding: '1px 6px',
                        background: T.aLighter, color: T.a,
                        borderRadius: 999, fontWeight: 500,
                        verticalAlign: 'middle'
                      }}>mental</span>
                    )}
                  </td>
                  {state.people.map((p, i) => (
                    <td key={p.id} style={{
                      padding: '10px 12px', textAlign: 'center',
                      borderBottom: `1px solid ${T.lineSoft}`
                    }}>
                      <div style={{ display: 'inline-block' }}>
                        <RatingPicker
                          value={state.preferences[p.id]?.[t.id]}
                          onChange={(v) => setRating(p.id, t.id, v)}
                          color={i === 0 ? T.a : T.b}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

// ============================================================
// TAB: ALLOCATE
// ============================================================
const AllocateTab = ({ state, setState }) => {
  const setBid = (personId, taskId, value) => {
    setState({
      ...state,
      bids: {
        ...state.bids,
        [personId]: { ...state.bids[personId], [taskId]: value }
      }
    });
  };
  
  const autoBid = (personId) => {
    const newBids = {};
    let totalWeight = 0;
    state.tasks.forEach(t => {
      const rating = state.preferences[personId]?.[t.id] ?? 3;
      totalWeight += rating;
    });
    if (totalWeight === 0) return;
    state.tasks.forEach(t => {
      const rating = state.preferences[personId]?.[t.id] ?? 3;
      newBids[t.id] = Math.round((rating / totalWeight) * 100);
    });
    setState({
      ...state,
      bids: { ...state.bids, [personId]: newBids }
    });
  };
  
  const runAllocate = () => {
    const result = runAllocation(state.tasks, state.people, state.preferences, state.bids);
    setState({ ...state, assignments: result.assignments, transferLog: result.transferLog });
  };
  
  const [pA, pB] = state.people;
  const budgetA = totalBudget(state.bids, pA.id);
  const budgetB = totalBudget(state.bids, pB.id);
  
  const burdenA = state.tasks.reduce((s, t) => {
    if (state.assignments[t.id] !== pA.id) return s;
    return s + compositeScore(t, pA, state.preferences[pA.id]?.[t.id]);
  }, 0);
  const burdenB = state.tasks.reduce((s, t) => {
    if (state.assignments[t.id] !== pB.id) return s;
    return s + compositeScore(t, pB, state.preferences[pB.id]?.[t.id]);
  }, 0);
  const burdenTotal = burdenA + burdenB;
  const ratioA = burdenTotal > 0 ? burdenA / burdenTotal : 0.5;
  const hasAllocation = Object.keys(state.assignments).length > 0;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card>
        <SectionTitle
          icon={Scale}
          subtitle="Each person bids 100 points across all tasks. Bid more on tasks you'd prefer to keep. Highest bidder wins each task; the algorithm then rebalances to stay within 15% of equal burden."
        >Bid for tasks</SectionTitle>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 20 }}>
          {state.people.map((p, idx) => {
            const budget = idx === 0 ? budgetA : budgetB;
            const color = idx === 0 ? T.a : T.b;
            const over = budget > 100;
            return (
              <div key={p.id}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: 8
                }}>
                  <PersonBadge person={p} isA={idx === 0} />
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 13, fontWeight: 500,
                    color: over ? T.b : T.ink
                  }}>
                    {Math.round(budget)} / 100
                  </span>
                </div>
                <div style={{
                  height: 6, background: T.lineSoft, borderRadius: 999,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(budget, 100)}%`,
                    background: over ? T.b : color,
                    transition: 'width 0.2s'
                  }} />
                </div>
                <div style={{ marginTop: 8 }}>
                  <Button small onClick={() => autoBid(p.id)}>
                    <Sparkles size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                    Auto-bid from preferences
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        
        {state.tasks.length > 0 && (
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, color: T.inkSoft, fontWeight: 500, borderBottom: `1px solid ${T.line}` }}>Task</th>
                  {state.people.map((p, i) => (
                    <th key={p.id} style={{
                      textAlign: 'center', padding: '8px 12px',
                      fontSize: 12, fontWeight: 500,
                      color: i === 0 ? T.a : T.b,
                      borderBottom: `1px solid ${T.line}`
                    }}>{p.name}'s bid</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.tasks.map(t => (
                  <tr key={t.id}>
                    <td style={{
                      padding: '8px 12px', fontSize: 14, color: T.ink,
                      borderBottom: `1px solid ${T.lineSoft}`
                    }}>{t.name}</td>
                    {state.people.map((p) => (
                      <td key={p.id} style={{
                        padding: '8px 12px', textAlign: 'center',
                        borderBottom: `1px solid ${T.lineSoft}`
                      }}>
                        <NumberInput
                          value={state.bids[p.id]?.[t.id] ?? 0}
                          onChange={(v) => setBid(p.id, t.id, v === '' ? 0 : v)}
                          min={0} max={100}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <Button primary onClick={runAllocate} disabled={state.tasks.length === 0}>
            <ArrowRightLeft size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            Run allocation
          </Button>
        </div>
      </Card>
      
      {hasAllocation && (
        <>
          <Card>
            <SectionTitle subtitle="The fairness ratio shows weighted burden distribution. Aim for 50/50 ± 7.5% as the tolerance band.">
              Allocation result
            </SectionTitle>
            
            <div style={{ marginBottom: 24 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                marginBottom: 8, fontSize: 13
              }}>
                <span style={{ color: T.a, fontWeight: 500 }}>
                  {pA.name} · {Math.round(ratioA * 100)}%
                </span>
                <span style={{ color: T.b, fontWeight: 500 }}>
                  {Math.round((1 - ratioA) * 100)}% · {pB.name}
                </span>
              </div>
              <div style={{
                height: 12, borderRadius: 999,
                background: T.lineSoft, overflow: 'hidden',
                display: 'flex', position: 'relative'
              }}>
                <div style={{
                  width: `${ratioA * 100}%`, background: T.a,
                  transition: 'width 0.3s'
                }} />
                <div style={{
                  width: `${(1 - ratioA) * 100}%`, background: T.b,
                  transition: 'width 0.3s'
                }} />
                {/* tolerance band markers */}
                <div style={{
                  position: 'absolute', left: '42.5%', top: -4, bottom: -4,
                  width: 1, background: T.ink + '40'
                }} />
                <div style={{
                  position: 'absolute', left: '57.5%', top: -4, bottom: -4,
                  width: 1, background: T.ink + '40'
                }} />
              </div>
              <div style={{
                fontSize: 12, color: T.inkSofter, marginTop: 8, textAlign: 'center'
              }}>
                Burden score: {pA.name} {burdenA.toFixed(2)} · {pB.name} {burdenB.toFixed(2)} · vertical lines mark the 15% tolerance band
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {state.people.map((p, idx) => {
                const tasks = state.tasks.filter(t => state.assignments[t.id] === p.id);
                const accent = idx === 0 ? T.a : T.b;
                const tint = idx === 0 ? T.aLighter : T.bLighter;
                return (
                  <div key={p.id} style={{
                    border: `1px solid ${T.line}`,
                    borderRadius: 10,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      padding: '10px 14px',
                      background: tint,
                      fontSize: 14, fontWeight: 500, color: accent,
                      display: 'flex', justifyContent: 'space-between'
                    }}>
                      <span>{p.name}</span>
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 12
                      }}>{tasks.length} tasks</span>
                    </div>
                    <div style={{ padding: 8 }}>
                      {tasks.length === 0 ? (
                        <div style={{ padding: 20, fontSize: 13, color: T.inkSofter, textAlign: 'center' }}>
                          No tasks assigned
                        </div>
                      ) : tasks.map(t => {
                        const score = compositeScore(t, p, state.preferences[p.id]?.[t.id]);
                        return (
                          <div key={t.id} style={{
                            padding: '6px 10px',
                            display: 'flex', justifyContent: 'space-between',
                            fontSize: 13, color: T.ink
                          }}>
                            <span>{t.name}</span>
                            <span style={{
                              fontFamily: 'JetBrains Mono, monospace',
                              color: T.inkSofter, fontSize: 12
                            }}>{score.toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
          
          {state.transferLog.length > 0 && (
            <Card>
              <SectionTitle
                icon={ArrowRightLeft}
                subtitle="Tasks the algorithm rebalanced from the overburdened person to keep within tolerance. Smallest bid margins move first."
              >Rebalancing log</SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {state.transferLog.map((log, i) => {
                  const from = state.people.find(p => p.id === log.from);
                  const to = state.people.find(p => p.id === log.to);
                  return (
                    <div key={i} style={{
                      padding: '10px 14px',
                      background: T.lineSoft, borderRadius: 8,
                      display: 'flex', alignItems: 'center', gap: 12,
                      fontSize: 13
                    }}>
                      <span style={{ fontWeight: 500, color: T.ink, flex: 1 }}>{log.taskName}</span>
                      <span style={{ color: from.id === 'a' ? T.a : T.b }}>{from.name}</span>
                      <ArrowRightLeft size={14} style={{ color: T.inkSofter }} />
                      <span style={{ color: to.id === 'a' ? T.a : T.b }}>{to.name}</span>
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11, color: T.inkSofter,
                        minWidth: 50, textAlign: 'right'
                      }}>±{log.margin}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

// ============================================================
// TAB: TRACK
// ============================================================
const TrackTab = ({ state, setState }) => {
  const today = new Date();
  const currentWeek = useMemo(() => {
    const d = new Date(today);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay() + 1); // Monday
    return d.toISOString().slice(0, 10);
  }, []);
  
  const [activeWeek, setActiveWeek] = useState(currentWeek);
  
  const toggleCompletion = (taskId, personId) => {
    const exists = state.completions.find(c =>
      c.taskId === taskId && c.personId === personId && c.week === activeWeek
    );
    if (exists) {
      setState({
        ...state,
        completions: state.completions.filter(c =>
          !(c.taskId === taskId && c.personId === personId && c.week === activeWeek)
        )
      });
    } else {
      setState({
        ...state,
        completions: [...state.completions, {
          taskId, personId, week: activeWeek, date: new Date().toISOString()
        }]
      });
    }
  };
  
  // Rolling 4-week burden
  const weeklyBurden = useMemo(() => {
    const weeks = [];
    const base = new Date(currentWeek);
    for (let i = 7; i >= 0; i--) {
      const d = new Date(base);
      d.setDate(d.getDate() - i * 7);
      const wk = d.toISOString().slice(0, 10);
      const wkLabel = `${d.getDate()}/${d.getMonth() + 1}`;
      const burdenForPerson = (pid) => {
        const person = state.people.find(p => p.id === pid);
        return state.completions
          .filter(c => c.week === wk && c.personId === pid)
          .reduce((s, c) => {
            const task = state.tasks.find(t => t.id === c.taskId);
            if (!task) return s;
            return s + compositeScore(task, person, state.preferences[pid]?.[c.taskId]);
          }, 0);
      };
      weeks.push({
        week: wkLabel,
        weekKey: wk,
        [state.people[0].name]: Number(burdenForPerson('a').toFixed(2)),
        [state.people[1].name]: Number(burdenForPerson('b').toFixed(2))
      });
    }
    return weeks;
  }, [state.completions, state.tasks, state.people, state.preferences, currentWeek]);
  
  // 4-week rolling average ratio
  const rollingAvg = useMemo(() => {
    const last4 = weeklyBurden.slice(-4);
    const sumA = last4.reduce((s, w) => s + w[state.people[0].name], 0);
    const sumB = last4.reduce((s, w) => s + w[state.people[1].name], 0);
    const total = sumA + sumB;
    if (total === 0) return { a: 50, b: 50, hasData: false };
    return {
      a: Math.round((sumA / total) * 100),
      b: Math.round((sumB / total) * 100),
      hasData: true
    };
  }, [weeklyBurden, state.people]);
  
  const [excDesc, setExcDesc] = useState('');
  const [excScore, setExcScore] = useState(3);
  const [excPerson, setExcPerson] = useState('a');
  
  const addExceptional = () => {
    if (!excDesc.trim()) return;
    setState({
      ...state,
      exceptional: [...state.exceptional, {
        id: `e${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        personId: excPerson,
        description: excDesc.trim(),
        score: excScore
      }]
    });
    setExcDesc('');
    setExcScore(3);
  };
  
  const deleteExceptional = (id) => {
    setState({
      ...state,
      exceptional: state.exceptional.filter(e => e.id !== id)
    });
  };
  
  const weekTasks = state.tasks.filter(t => state.assignments[t.id]);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card>
        <SectionTitle
          icon={BarChart3}
          subtitle="4-week rolling average. The ratio matters more than weekly totals — natural variation gets smoothed out."
        >Fairness ratio</SectionTitle>
        
        {!rollingAvg.hasData ? (
          <div style={{
            padding: 30, textAlign: 'center', color: T.inkSoft,
            background: T.lineSoft, borderRadius: 10
          }}>
            Log some completions to see the ratio.
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 8 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                marginBottom: 8, fontSize: 14, fontWeight: 500
              }}>
                <span style={{ color: T.a }}>{state.people[0].name} · {rollingAvg.a}%</span>
                <span style={{ color: T.b }}>{rollingAvg.b}% · {state.people[1].name}</span>
              </div>
              <div style={{
                height: 14, borderRadius: 999, background: T.lineSoft,
                overflow: 'hidden', display: 'flex', position: 'relative'
              }}>
                <div style={{ width: `${rollingAvg.a}%`, background: T.a, transition: 'width 0.3s' }} />
                <div style={{ width: `${rollingAvg.b}%`, background: T.b, transition: 'width 0.3s' }} />
                <div style={{
                  position: 'absolute', left: '42.5%', top: -4, bottom: -4,
                  width: 1, background: T.ink + '40'
                }} />
                <div style={{
                  position: 'absolute', left: '57.5%', top: -4, bottom: -4,
                  width: 1, background: T.ink + '40'
                }} />
              </div>
            </div>
          </>
        )}
        
        <div style={{ height: 240, marginTop: 24 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyBurden}>
              <CartesianGrid stroke={T.lineSoft} vertical={false} />
              <XAxis
                dataKey="week"
                stroke={T.inkSofter}
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke={T.inkSofter}
                tick={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: `1px solid ${T.line}`,
                  borderRadius: 8,
                  fontSize: 13
                }}
              />
              <Line
                type="monotone"
                dataKey={state.people[0].name}
                stroke={T.a}
                strokeWidth={2}
                dot={{ fill: T.a, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey={state.people[1].name}
                stroke={T.b}
                strokeWidth={2}
                dot={{ fill: T.b, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <Card>
        <SectionTitle
          icon={Check}
          subtitle="Mark completed tasks for the week. Most daily logging should happen in your shared checklist app — use this for periodic sync or weekly review."
        >This week</SectionTitle>
        
        <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <Calendar size={14} style={{ color: T.inkSoft }} />
          <input
            type="date"
            value={activeWeek}
            onChange={(e) => setActiveWeek(e.target.value)}
            style={{
              padding: '6px 10px', fontSize: 13, fontFamily: 'inherit',
              border: `1px solid ${T.line}`, borderRadius: 6
            }}
          />
          <span style={{ fontSize: 13, color: T.inkSoft }}>
            Week of {new Date(activeWeek).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </span>
        </div>
        
        {weekTasks.length === 0 ? (
          <div style={{
            padding: 30, textAlign: 'center', color: T.inkSoft,
            background: T.lineSoft, borderRadius: 10
          }}>
            No tasks assigned yet. Run an allocation on the Allocate tab first.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {weekTasks.map(t => {
              const assignee = state.people.find(p => p.id === state.assignments[t.id]);
              const isA = assignee.id === 'a';
              const completed = state.completions.find(c =>
                c.taskId === t.id && c.personId === assignee.id && c.week === activeWeek
              );
              return (
                <div
                  key={t.id}
                  onClick={() => toggleCompletion(t.id, assignee.id)}
                  style={{
                    padding: '10px 14px',
                    border: `1px solid ${T.line}`,
                    borderRadius: 8,
                    background: completed ? (isA ? T.aLighter : T.bLighter) : '#fff',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12,
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: 4,
                    border: `1.5px solid ${completed ? (isA ? T.a : T.b) : T.line}`,
                    background: completed ? (isA ? T.a : T.b) : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {completed && <Check size={12} style={{ color: '#fff' }} />}
                  </div>
                  <span style={{
                    flex: 1, fontSize: 14,
                    color: T.ink,
                    textDecoration: completed ? 'line-through' : 'none',
                    opacity: completed ? 0.6 : 1
                  }}>{t.name}</span>
                  <PersonBadge person={assignee} isA={isA} />
                </div>
              );
            })}
          </div>
        )}
      </Card>
      
      <Card>
        <SectionTitle
          icon={Sparkles}
          subtitle="One-off significant contributions (e.g. fixing the dishwasher, planning a holiday). Visible but excluded from the rolling average so they don't distort steady-state."
        >Exceptional contributions</SectionTitle>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto auto',
          gap: 8, alignItems: 'center',
          marginBottom: 16
        }}>
          <input
            type="text"
            value={excDesc}
            onChange={(e) => setExcDesc(e.target.value)}
            placeholder="What happened?"
            style={{
              padding: '8px 12px', fontSize: 14, fontFamily: 'inherit',
              border: `1px solid ${T.line}`, borderRadius: 6
            }}
          />
          <select
            value={excPerson}
            onChange={(e) => setExcPerson(e.target.value)}
            style={{
              padding: '8px 12px', fontSize: 14, fontFamily: 'inherit',
              border: `1px solid ${T.line}`, borderRadius: 6
            }}
          >
            {state.people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <NumberInput value={excScore} onChange={setExcScore} min={1} max={10} step={1} />
          <Button primary onClick={addExceptional}>Log</Button>
        </div>
        
        {state.exceptional.length === 0 ? (
          <div style={{
            padding: 20, textAlign: 'center', color: T.inkSofter,
            fontSize: 13
          }}>
            No exceptional contributions logged yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[...state.exceptional].reverse().map(e => {
              const person = state.people.find(p => p.id === e.personId);
              return (
                <div key={e.id} style={{
                  padding: '8px 12px',
                  background: T.lineSoft, borderRadius: 6,
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontSize: 13
                }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 11, color: T.inkSofter, minWidth: 70
                  }}>{e.date}</span>
                  <PersonBadge person={person} isA={person.id === 'a'} />
                  <span style={{ flex: 1, color: T.ink }}>{e.description}</span>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 12, color: T.inkSoft
                  }}>weight {e.score}</span>
                  <button
                    onClick={() => deleteExceptional(e.id)}
                    style={{
                      background: 'transparent', border: 'none',
                      cursor: 'pointer', color: T.inkSofter, padding: 2
                    }}
                  ><X size={14} /></button>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
const TABS = [
  { id: 'setup', label: 'Setup', icon: Users },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'preferences', label: 'Preferences', icon: Heart },
  { id: 'allocate', label: 'Allocate', icon: Scale },
  { id: 'track', label: 'Track', icon: BarChart3 }
];

export default function App() {
  const [state, setState] = useState(DEFAULT_STATE);
  const [activeTab, setActiveTab] = useState('setup');
  const [loaded, setLoaded] = useState(false);
  
  // Inject fonts
  useEffect(() => {
    if (!document.querySelector('link[href*="Fraunces"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = FONTS_LINK;
      document.head.appendChild(link);
    }
  }, []);
  
  // Load from storage
  useEffect(() => {
    async function load() {
      try {
        const result = await window.storage.get('task-allocator-state');
        if (result && result.value) {
          const parsed = JSON.parse(result.value);
          setState({ ...DEFAULT_STATE, ...parsed });
        }
      } catch (e) {
        // No saved state — use default
      }
      setLoaded(true);
    }
    load();
  }, []);
  
  // Save to storage
  useEffect(() => {
    if (!loaded) return;
    window.storage.set('task-allocator-state', JSON.stringify(state)).catch(() => {});
  }, [state, loaded]);
  
  if (!loaded) {
    return (
      <div style={{
        minHeight: '100vh',
        background: T.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: T.inkSoft, fontFamily: 'Plus Jakarta Sans, sans-serif'
      }}>Loading…</div>
    );
  }
  
  return (
    <div style={{
      minHeight: '100vh',
      background: T.bg,
      color: T.ink,
      fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
      paddingBottom: 80
    }}>
      {/* Header */}
      <header style={{
        borderBottom: `1px solid ${T.line}`,
        background: T.bg,
        position: 'sticky', top: 0, zIndex: 10
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 28px 0' }}>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 32,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              margin: 0,
              color: T.ink,
              lineHeight: 1.1
            }}>
              Equitable
            </h1>
            <p style={{
              fontSize: 14, color: T.inkSoft, margin: '4px 0 0',
              fontStyle: 'italic', fontFamily: 'Fraunces, serif'
            }}>
              Task allocation by weighted burden, with revealed preference
            </p>
          </div>
          
          <nav style={{ display: 'flex', gap: 4, marginBottom: -1 }}>
            {TABS.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '12px 16px',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    fontWeight: active ? 500 : 400,
                    background: 'transparent',
                    border: 'none',
                    borderBottom: `2px solid ${active ? T.ink : 'transparent'}`,
                    color: active ? T.ink : T.inkSoft,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'color 0.15s'
                  }}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>
      
      {/* Content */}
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '28px' }}>
        {activeTab === 'setup' && <SetupTab state={state} setState={setState} />}
        {activeTab === 'tasks' && <TasksTab state={state} setState={setState} />}
        {activeTab === 'preferences' && <PreferencesTab state={state} setState={setState} />}
        {activeTab === 'allocate' && <AllocateTab state={state} setState={setState} />}
        {activeTab === 'track' && <TrackTab state={state} setState={setState} />}
      </main>
    </div>
  );
}
