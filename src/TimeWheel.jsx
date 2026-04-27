import React, { useState, useMemo, useRef, useEffect } from 'react';

const ADVISEES = [{"id":"David Kline","year":1986,"i":"Unknown"},{"id":"Tong-sheng Sun","year":1987,"i":"Unknown"},{"id":"Patrick McAllister","year":1987,"i":"Brighthouse Financial"},{"id":"David Carino","year":1987,"i":"Industry"},{"id":"Matthew Owen Jackson","year":1988,"i":"Stanford University"},{"id":"Alexander John Triantis","year":1988,"i":"Johns Hopkins University"},{"id":"Michihiro Kandori","year":1988,"i":"University of Tokyo"},{"id":"Peter DeMarzo","year":1989,"i":"Stanford University"},{"id":"Charles John Cuny","year":1990,"i":"Washington University in St. Louis"},{"id":"Jung-Jin Lee","year":1992,"i":"Sogang University"},{"id":"Costis Skiadas","year":1992,"i":"Northwestern University"},{"id":"Rohit Rahi","year":1992,"i":"LSE"},{"id":"Richard Stanton","year":1992,"i":"UC Berkeley"},{"id":"Robert Whitelaw","year":1993,"i":"NYU"},{"id":"Philippe Henrotte","year":1993,"i":"ITO 33"},{"id":"Christopher Nerio Avery","year":1993,"i":"Harvard University"},{"id":"Anne Hannah Korin","year":1994,"i":"Unknown"},{"id":"Jun Liu","year":1994,"i":"UC San Diego"},{"id":"Rui Kan","year":1994,"i":"Unknown"},{"id":"Lassaad Adel Turki","year":1994,"i":"Compass Lexecon"},{"id":"Toshiki Honda","year":1994,"i":"Hitotsubashi University"},{"id":"Davide Lombardo","year":1995,"i":"European Commission"},{"id":"Jun Pan","year":1995,"i":"Shanghai Jiao Tong University"},{"id":"Muhamet Yildiz","year":1995,"i":"MIT"},{"id":"Mark Evans Ferguson","year":1995,"i":"84.51"},{"id":"Monika Piazzesi","year":1995,"i":"Stanford University"},{"id":"Farid Aitsahlia","year":1995,"i":"University of Florida"},{"id":"Miguel Sousa Lobo","year":1996,"i":"INSEAD"},{"id":"Ming Huang","year":1996,"i":"Cornell University"},{"id":"Mark Q. Prindville","year":1996,"i":"Allstate"},{"id":"Erik Ordentlich","year":1996,"i":"NVIDIA"},{"id":"Nicolae Bogdan Garleanu","year":1997,"i":"UC Berkeley"},{"id":"Lasse Heje Pedersen","year":1997,"i":"Copenhagen Business School"},{"id":"Neng Wang","year":1997,"i":"Columbia University"},{"id":"Kaushik Ronnie Sircar","year":1997,"i":"Princeton University"},{"id":"Don H Kim","year":1998,"i":"Federal Reserve"},{"id":"Ke Wang","year":1998,"i":"Federal Reserve"},{"id":"Muthukumar Muthuraman","year":1998,"i":"UT Austin"},{"id":"Mark Jeremy Garmaise","year":1998,"i":"UCLA"},{"id":"Qiang Dai","year":1998,"i":"Industry"},{"id":"Alexei Vladimirovich Tchistyi","year":1999,"i":"Cornell University"},{"id":"Yigal S. Newman","year":1999,"i":"Hebrew University of Jerusalem"},{"id":"Antje Berndt","year":1999,"i":"Australian National University"},{"id":"Pierre-Olivier Weill","year":1999,"i":"UCLA"},{"id":"Michael Allen Ryerson","year":1999,"i":"Citadel"},{"id":"Devin Manori Shanthikumar","year":2000,"i":"UC Irvine"},{"id":"Wei Yang","year":2000,"i":"William & Mary"},{"id":"Ruixue Liu","year":2000,"i":"Google"},{"id":"Bing Han","year":2000,"i":"Adobe"},{"id":"Oliver Renault","year":2000,"i":"Unknown"},{"id":"Gustavo Manso","year":2001,"i":"UC Berkeley"},{"id":"Jeremy James Graveline","year":2001,"i":"Pluribus Labs"},{"id":"Leandro Daniel Saita","year":2001,"i":"Barclays Capital"},{"id":"Bjorgvin Skuli Sigurdsson","year":2001,"i":"Laki Power"},{"id":"Scott Joslin","year":2002,"i":"USC"},{"id":"Romans Pancs","year":2002,"i":"ITAM"},{"id":"Baozhong Yang","year":2002,"i":"Georgia State University"},{"id":"Zhipeng Zhang","year":2003,"i":"Shanghai"},{"id":"Sith Chaisurote","year":2003,"i":"Land and Houses USA Inc."},{"id":"Wei Wu","year":2004,"i":"Beijing"},{"id":"Andreas Eckner","year":2004,"i":"LMCG"},{"id":"Sergey Lobanov","year":2005,"i":"quantPORT"},{"id":"Bruno Henri Strulovici","year":2005,"i":"Northwestern University"},{"id":"Sergei Davydenko","year":2005,"i":"University of Toronto"},{"id":"Albert Lee Chun","year":2006,"i":"University of Queensland"},{"id":"Haoxiang Zhu","year":2006,"i":"MIT"},{"id":"Antoine Yves Marie Lallour","year":2006,"i":"Bank of England"},{"id":"Gustavo Adolfo Schwenkler","year":2007,"i":"Boston University"},{"id":"Luis Felipe Varas Greene","year":2007,"i":"Duke University"},{"id":"Sebastian Jose Infante Bilbao","year":2007,"i":"Federal Reserve"},{"id":"Lars Kristoffer Tebering Laursen","year":2007,"i":"AQR"},{"id":"Ying Xue","year":2007,"i":"Unknown"},{"id":"Jinjin Qian","year":2007,"i":"Fiverr"},{"id":"Hao Zou","year":2008,"i":"Beijing"},{"id":"Dmitry Orlov","year":2008,"i":"UW Madison"},{"id":"Lin Cong","year":2008,"i":"Cornell University"},{"id":"Jose Manuel Ureta Rojas","year":2009,"i":"Marine Farm"},{"id":"Michael William Schwert","year":2010,"i":"University of Pennsylvania"},{"id":"Michael Zhang","year":2010,"i":"NAAIK"},{"id":"Emily Casey Warren Kapur","year":2010,"i":"Quinn Emanuel Urquhart & Sullivan"},{"id":"Egemen Eren","year":2010,"i":"Bank for International Settlements"},{"id":"Chaojun Wang","year":2011,"i":"University of Pennsylvania"},{"id":"Akitada Kasahara","year":2011,"i":"Google"},{"id":"Piotr Dworczak","year":2011,"i":"Northwestern University"},{"id":"Mohit Thukral","year":2012,"i":"Vivtera"},{"id":"Zhengyang Jiang","year":2012,"i":"Northwestern University"},{"id":"Yang Song","year":2013,"i":"University of Washington"},{"id":"Anthony Lee Zhang","year":2013,"i":"University of Chicago"},{"id":"Yu An","year":2013,"i":"Johns Hopkins University"},{"id":"Wenhao Li","year":2013,"i":"USC"},{"id":"Julien Cujean","year":2013,"i":"University of Bern"},{"id":"Samuel Byron Antill","year":2014,"i":"Harvard University"},{"id":"Jonathan Wallen","year":2014,"i":"Harvard University"},{"id":"Yilin Yang","year":2015,"i":"Minnesota"},{"id":"Benjamin Levi Kaufman","year":2017,"i":"Student Borrower Protection Center"},{"id":"Vincent Bogouslavssky","year":2017,"i":"Boston College"},{"id":"Long Kim Do","year":2018,"i":"Singapore"},{"id":"Aayan Das","year":2021,"i":"UC Berkeley"},{"id":"Milena Wittwer","year":2021,"i":"Boston College"},{"id":"Hee Su Roh","year":2022,"i":"Amazon"},{"id":"Lulu Wang","year":2023,"i":"Northwestern University"},{"id":"Lorenzo Rigon","year":2024,"i":"Two Sigma"}];

const W = 1200, H = 1200;
const cx = W / 2, cy = H / 2;
const R = 290;
const TWO_PI = 2 * Math.PI;

const C = {
  bg:        '#0e0e10',
  panel:     '#16171b',
  panelEdge: '#23252b',
  text:      '#e8e8ec',
  textDim:   '#8a8c93',
  textFaint: '#5a5c63',
  rule:      '#2a2c33',
  node:      '#9bb5d6',
  nodeStan:  '#e8a87c',
  nodeHi:    '#f5d491',
  center:    '#cfd6e0',
  cohort:    '#7ab8e5',
  inst:      '#f29470',
  advisor:   '#3a4250',
  glow:      '#2a3a52',
};

export default function TimeWheel() {
  const [rotation, setRotation] = useState(0);
  const [showAdvisor, setShowAdvisor] = useState(true);
  const [showCohort, setShowCohort] = useState(true);
  const [showInstitution, setShowInstitution] = useState(true);
  const [hover, setHover] = useState(null);
  const [selectedInst, setSelectedInst] = useState(null);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [cohortColor, setCohortColor] = useState('#7ab8e5');
  const [instColor, setInstColor] = useState('#f29470');
  const [picker, setPicker] = useState(null); // { kind: 'cohort'|'institution', x, y }
  const svgRef = useRef(null);
  const [transform, setTransform] = useState({ k: 1, x: 0, y: 0 });
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 768);

  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isNarrow = vw < 720;

  // Export the current wheel as a high-res PNG
  const exportPNG = async (scale = 3) => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    // Clone the SVG so we don't mutate the live one
    const clone = svgEl.cloneNode(true);
    // Set explicit pixel dimensions and a solid background
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', W);
    clone.setAttribute('height', H);
    // Inject background rect so PNG isn't transparent
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', 0); bg.setAttribute('y', 0);
    bg.setAttribute('width', W); bg.setAttribute('height', H);
    bg.setAttribute('fill', C.bg);
    clone.insertBefore(bg, clone.firstChild);

    const xml = new XMLSerializer().serializeToString(clone);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const imgSrc = `data:image/svg+xml;base64,${svg64}`;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = W * scale;
      canvas.height = H * scale;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'duffie-academic-lineage.png';
      a.click();
    };
    img.onerror = (e) => {
      console.error('PNG export failed', e);
      alert('Export failed. Try again or take a screenshot instead.');
    };
    img.src = imgSrc;
  };

  const nodes = useMemo(() => {
    const sorted = [...ADVISEES].sort((a, b) => a.year - b.year);
    const N = sorted.length;
    const start = -Math.PI / 2;
    return sorted.map((d, i) => ({
      ...d,
      baseAngle: start + (TWO_PI * i) / N,
    }));
  }, []);

  const positioned = useMemo(() => {
    const offset = rotation * (Math.PI / 180);
    return nodes.map(d => {
      const a = d.baseAngle + offset;
      return {
        ...d,
        currentAngle: a,
        x: cx + R * Math.cos(a),
        y: cy + R * Math.sin(a),
      };
    });
  }, [nodes, rotation]);

  const nodeById = useMemo(() => {
    const m = new Map();
    positioned.forEach(d => m.set(d.id, d));
    return m;
  }, [positioned]);

  const cohortLinks = useMemo(() => {
    const links = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.abs(nodes[i].year - nodes[j].year) <= 4) {
          links.push({ source: nodes[i].id, target: nodes[j].id });
        }
      }
    }
    return links;
  }, [nodes]);

  const institutionLinks = useMemo(() => {
    const groups = new Map();
    for (const d of nodes) {
      if (d.i === 'Unknown' || d.i === 'Industry') continue;
      if (!groups.has(d.i)) groups.set(d.i, []);
      groups.get(d.i).push(d);
    }
    const links = [];
    for (const [inst, group] of groups) {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          links.push({ source: group[i].id, target: group[j].id, inst });
        }
      }
    }
    return links;
  }, [nodes]);

  const totalLinks =
    (showAdvisor ? positioned.length : 0) +
    (showCohort ? cohortLinks.length : 0) +
    (showInstitution ? institutionLinks.length : 0);

  const advisorPath = (t) => `M${cx},${cy}L${t.x},${t.y}`;
  const bezierPath = (s, t, strength) => {
    const midX = (s.x + t.x) / 2;
    const midY = (s.y + t.y) / 2;
    const ctrlX = cx + (midX - cx) * strength;
    const ctrlY = cy + (midY - cy) * strength;
    return `M${s.x},${s.y} Q${ctrlX},${ctrlY} ${t.x},${t.y}`;
  };

  const normalize = (a) => {
    let x = a % TWO_PI;
    if (x < 0) x += TWO_PI;
    return x;
  };

  const labelTransform = (d) => {
    const norm = normalize(d.currentAngle);
    const deg = d.currentAngle * 180 / Math.PI;
    const lx = cx + (R + 14) * Math.cos(d.currentAngle);
    const ly = cy + (R + 14) * Math.sin(d.currentAngle);
    if (norm > Math.PI / 2 && norm < 3 * Math.PI / 2) {
      return `translate(${lx},${ly}) rotate(${deg + 180})`;
    }
    return `translate(${lx},${ly}) rotate(${deg})`;
  };

  const labelAnchor = (d) => {
    const norm = normalize(d.currentAngle);
    return (norm > Math.PI / 2 && norm < 3 * Math.PI / 2) ? 'end' : 'start';
  };

  const labelDx = (d) => {
    const norm = normalize(d.currentAngle);
    return (norm > Math.PI / 2 && norm < 3 * Math.PI / 2) ? -3 : 3;
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    let dragging = false;
    let last = { x: 0, y: 0 };

    const onWheel = (e) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      setTransform(t => {
        const newK = Math.min(5, Math.max(0.3, t.k * (1 + delta)));
        const rect = svg.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const ratio = newK / t.k;
        return {
          k: newK,
          x: mx - ratio * (mx - t.x),
          y: my - ratio * (my - t.y),
        };
      });
    };
    const onDown = (e) => { dragging = true; last = { x: e.clientX, y: e.clientY }; };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      last = { x: e.clientX, y: e.clientY };
      setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }));
    };
    const onUp = () => { dragging = false; };

    svg.addEventListener('wheel', onWheel, { passive: false });
    svg.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      svg.removeEventListener('wheel', onWheel);
      svg.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const stanfordCount = positioned.filter(d => d.i === 'Stanford University').length;
  const rootTransform = `translate(${transform.x},${transform.y}) scale(${transform.k})`;

  const selectedPerson = useMemo(() => {
    if (!selectedPersonId) return null;
    return positioned.find(d => d.id === selectedPersonId) || null;
  }, [selectedPersonId, positioned]);

  const selectedNodeIds = useMemo(() => {
    if (selectedInst) {
      return new Set(positioned.filter(d => d.i === selectedInst).map(d => d.id));
    }
    if (selectedPerson) {
      // Person + everyone in their cohort (±4 yrs) + same institution (if known)
      const ids = new Set([selectedPerson.id]);
      for (const d of positioned) {
        if (Math.abs(d.year - selectedPerson.year) <= 4) ids.add(d.id);
        if (d.i === selectedPerson.i && d.i !== 'Unknown' && d.i !== 'Industry') ids.add(d.id);
      }
      return ids;
    }
    return null;
  }, [selectedInst, selectedPerson, positioned]);

  const hasSelection = selectedInst || selectedPersonId;

  const multiInsts = useMemo(() => {
    const counts = new Map();
    for (const d of nodes) {
      if (d.i === 'Unknown' || d.i === 'Industry') continue;
      counts.set(d.i, (counts.get(d.i) || 0) + 1);
    }
    return [...counts.entries()]
      .filter(([, c]) => c > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [nodes]);

  // Estimate vertical space taken by header + controls (rough but stable)
  const chromeHeight = isNarrow ? 200 : 160;
  const horizontalPadding = isNarrow ? 24 : 40;
  const wheelMaxSize = Math.min(vw - horizontalPadding, vh - chromeHeight);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: C.bg,
      color: C.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
      padding: isNarrow ? '10px 12px' : '16px 20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}>

        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 8,
          flexShrink: 0,
        }}>
          <h1 style={{
            margin: 0,
            fontSize: isNarrow ? 18 : 24,
            fontWeight: 600,
            letterSpacing: '-0.3px',
          }}>
            Duffie Academic Lineage
          </h1>
          <div style={{
            fontSize: isNarrow ? 11 : 12,
            color: C.textDim,
            letterSpacing: '0.3px',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {nodes.length} advisees · {stanfordCount} at Stanford · {totalLinks.toLocaleString()} links
          </div>
        </div>

        <div style={{
          background: C.panel,
          border: `1px solid ${C.panelEdge}`,
          borderRadius: 16,
          padding: 4,
          marginBottom: 10,
          overflow: 'hidden',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            style={{
              width: wheelMaxSize,
              height: wheelMaxSize,
              maxWidth: '100%',
              maxHeight: '100%',
              display: 'block',
              cursor: 'grab',
              userSelect: 'none',
            }}
          >
            <defs>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={C.glow} stopOpacity="0.55" />
                <stop offset="100%" stopColor={C.glow} stopOpacity="0" />
              </radialGradient>
              <radialGradient id="centerNode" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="60%" stopColor={C.center} stopOpacity="1" />
                <stop offset="100%" stopColor="#7e8a9c" stopOpacity="1" />
              </radialGradient>
            </defs>

            <g transform={rootTransform}>
              <circle cx={cx} cy={cy} r={R * 0.85} fill="url(#centerGlow)" />
              <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.rule} strokeWidth={1} strokeDasharray="2 4" opacity={0.5} />

              {showAdvisor && (
                <g>
                  {positioned.map(d => {
                    const isOfPerson = selectedPersonId === d.id;
                    const dim = (selectedInst) || (selectedPersonId && !isOfPerson);
                    return (
                      <path
                        key={`a-${d.id}`}
                        d={advisorPath(d)}
                        fill="none"
                        stroke={isOfPerson ? C.nodeHi : C.advisor}
                        strokeWidth={isOfPerson ? 1.4 : 0.8}
                        strokeOpacity={dim ? 0.1 : (isOfPerson ? 0.9 : 0.85)}
                      />
                    );
                  })}
                </g>
              )}

              {showCohort && (
                <g>
                  {cohortLinks.map((l, idx) => {
                    const s = nodeById.get(l.source);
                    const t = nodeById.get(l.target);
                    // A cohort link is highlighted when it touches the selected person
                    const touchesPerson = selectedPersonId &&
                      (l.source === selectedPersonId || l.target === selectedPersonId);
                    const dim = (selectedInst) || (selectedPersonId && !touchesPerson);
                    return (
                      <path
                        key={`c-${idx}`}
                        d={bezierPath(s, t, 0.85)}
                        fill="none"
                        stroke={touchesPerson ? C.nodeHi : cohortColor}
                        strokeWidth={touchesPerson ? 1.6 : 0.7}
                        strokeOpacity={dim ? 0.05 : (touchesPerson ? 0.9 : 0.38)}
                        style={{ cursor: 'pointer', pointerEvents: 'stroke' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPicker({ kind: 'cohort', x: e.clientX, y: e.clientY });
                        }}
                      />
                    );
                  })}
                </g>
              )}

              {showInstitution && (
                <g>
                  {institutionLinks.map((l, idx) => {
                    const s = nodeById.get(l.source);
                    const t = nodeById.get(l.target);
                    const isInstSel = selectedInst && l.inst === selectedInst;
                    const touchesPerson = selectedPersonId &&
                      (l.source === selectedPersonId || l.target === selectedPersonId);
                    const isHi = isInstSel || touchesPerson;
                    const dim = (selectedInst && !isInstSel) ||
                                (selectedPersonId && !touchesPerson);
                    return (
                      <path
                        key={`i-${idx}`}
                        d={bezierPath(s, t, 0.25)}
                        fill="none"
                        stroke={isHi ? C.nodeHi : instColor}
                        strokeWidth={isHi ? 2.0 : 1.15}
                        strokeOpacity={dim ? 0.06 : (isHi ? 0.9 : 0.62)}
                        style={{ cursor: 'pointer', pointerEvents: 'stroke' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPicker({ kind: 'institution', x: e.clientX, y: e.clientY });
                        }}
                      />
                    );
                  })}
                </g>
              )}

              <g
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedInst(null);
                  setSelectedPersonId(null);
                }}
                style={{ cursor: 'pointer' }}
              >
                <circle cx={cx} cy={cy} r={32} fill="none" stroke={C.center} strokeOpacity={0.15} strokeWidth={1} />
                <circle cx={cx} cy={cy} r={16} fill="url(#centerNode)" />
                <text
                  x={cx} y={cy - 42}
                  textAnchor="middle"
                  fontSize={20}
                  fontWeight={700}
                  fill={C.text}
                  style={{ letterSpacing: '1.2px' }}
                >
                  DARRELL DUFFIE
                </text>
              </g>

              {positioned.map(d => {
                const isStan = d.i === 'Stanford University';
                const isInSel = selectedNodeIds && selectedNodeIds.has(d.id);
                const isDim = selectedNodeIds && !isInSel;
                const isHover = hover && hover.id === d.id;
                const isThePerson = selectedPersonId === d.id;

                let fill = C.node;
                if (isStan) fill = C.nodeStan;
                if (isInSel) fill = C.nodeHi;
                if (isThePerson) fill = '#ffffff';

                const r = isThePerson ? 7 : (isStan || isInSel ? 5.5 : 4);

                return (
                  <g
                    key={d.id}
                    onMouseEnter={(e) => setHover({ ...d, clientX: e.clientX, clientY: e.clientY })}
                    onMouseMove={(e) => setHover(h => h ? { ...h, clientX: e.clientX, clientY: e.clientY } : null)}
                    onMouseLeave={() => setHover(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPersonId(prev => prev === d.id ? null : d.id);
                      if (selectedInst) setSelectedInst(null);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx={d.x} cy={d.y}
                      r={isHover ? r + 2.5 : r}
                      fill={fill}
                      stroke={isThePerson ? C.nodeHi : C.panel}
                      strokeWidth={isThePerson ? 2.5 : 1.5}
                      opacity={isDim ? 0.25 : 1}
                    />
                  </g>
                );
              })}

              {positioned.map(d => {
                const isStan = d.i === 'Stanford University';
                const isInSel = selectedNodeIds && selectedNodeIds.has(d.id);
                const isDim = selectedNodeIds && !isInSel;
                const isThePerson = selectedPersonId === d.id;
                const yr = String(d.year).slice(2);
                let fill = C.text;
                if (isStan) fill = C.nodeStan;
                if (isInSel) fill = C.nodeHi;
                if (isThePerson) fill = '#ffffff';
                return (
                  <text
                    key={`l-${d.id}`}
                    transform={labelTransform(d)}
                    textAnchor={labelAnchor(d)}
                    dx={labelDx(d)}
                    dominantBaseline="middle"
                    fontSize={isThePerson ? 18 : 16}
                    fontWeight={isThePerson ? 800 : (isStan || isInSel ? 600 : 400)}
                    fill={fill}
                    opacity={isDim ? 0.25 : 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPersonId(prev => prev === d.id ? null : d.id);
                      if (selectedInst) setSelectedInst(null);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {`${d.id} ('${yr})`}
                  </text>
                );
              })}
            </g>
          </svg>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          flexShrink: 0,
        }}>

          {/* Pill toggles row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'center',
          }}>
            <Pill label="Advisor" color={C.advisor} active={showAdvisor} onClick={() => setShowAdvisor(!showAdvisor)} />
            <Pill label="Cohort" color={cohortColor} active={showCohort} onClick={() => setShowCohort(!showCohort)} />
            <Pill label="Institution" color={instColor} active={showInstitution} onClick={() => setShowInstitution(!showInstitution)} />
          </div>

          {/* Rotation + reset on one line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: C.textDim }}>
            <span style={{ fontSize: 11, letterSpacing: '0.5px' }}>ROTATE</span>
            <input
              type="range" min={0} max={360} step={1}
              value={rotation}
              onChange={(e) => setRotation(+e.target.value)}
              style={{ flex: 1, accentColor: C.cohort, height: 3 }}
            />
            <span style={{
              minWidth: 32,
              textAlign: 'right',
              fontVariantNumeric: 'tabular-nums',
              color: C.text,
            }}>
              {rotation}°
            </span>
            <button
              onClick={() => setTransform({ k: 1, x: 0, y: 0 })}
              style={{
                fontFamily: 'inherit',
                fontSize: 11,
                padding: '4px 10px',
                background: 'transparent',
                color: C.textDim,
                border: `1px solid ${C.panelEdge}`,
                borderRadius: 12,
                cursor: 'pointer',
                letterSpacing: '0.5px',
              }}
            >RESET</button>
          </div>

          {/* Highlight selectors */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.5px', color: C.textDim, minWidth: 64 }}>INSTITUTION</span>
            <select
              value={selectedInst || ''}
              onChange={(e) => {
                const v = e.target.value || null;
                setSelectedInst(v);
                if (v) setSelectedPersonId(null);
              }}
              style={{
                flex: 1,
                fontFamily: 'inherit',
                fontSize: 12,
                padding: '5px 8px',
                background: C.panel,
                color: C.text,
                border: `1px solid ${C.panelEdge}`,
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              <option value="">— none —</option>
              {multiInsts.map(([name, count]) => (
                <option key={name} value={name}>{name} · {count}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, minHeight: 26 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.5px', color: C.textDim, minWidth: 64 }}>SELECTED</span>
            {selectedPerson ? (
              <span style={{ flex: 1, color: C.text, fontWeight: 600 }}>
                {selectedPerson.id}
                <span style={{ color: C.textDim, fontWeight: 400, marginLeft: 8 }}>
                  · {selectedPerson.year} · {selectedPerson.i}
                </span>
              </span>
            ) : (
              <span style={{ flex: 1, color: C.textFaint, fontStyle: 'italic' }}>
                click any name on the wheel
              </span>
            )}
            {hasSelection && (
              <button
                onClick={() => { setSelectedInst(null); setSelectedPersonId(null); }}
                style={{
                  fontFamily: 'inherit',
                  fontSize: 11,
                  padding: '4px 10px',
                  background: 'transparent',
                  color: C.textDim,
                  border: `1px solid ${C.panelEdge}`,
                  borderRadius: 12,
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                }}
              >CLEAR</button>
            )}
            <button
              onClick={() => exportPNG(3)}
              title="Download a high-resolution PNG of the current view"
              style={{
                fontFamily: 'inherit',
                fontSize: 11,
                padding: '4px 10px',
                background: 'transparent',
                color: C.textDim,
                border: `1px solid ${C.panelEdge}`,
                borderRadius: 12,
                cursor: 'pointer',
                letterSpacing: '0.5px',
              }}
            >PNG</button>
          </div>
        </div>
      </div>

      {hover && (
        <div style={{
          position: 'fixed',
          left: hover.clientX + 14,
          top: hover.clientY + 14,
          background: 'rgba(22,23,27,0.96)',
          color: C.text,
          padding: '10px 14px',
          fontSize: 12,
          fontFamily: 'inherit',
          maxWidth: 280,
          pointerEvents: 'none',
          zIndex: 100,
          border: `1px solid ${C.panelEdge}`,
          borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 13 }}>{hover.id}</div>
          <div style={{ color: C.textDim, fontSize: 11, marginBottom: 2 }}>Ph.D. {hover.year}</div>
          <div style={{ color: C.textDim, fontSize: 11 }}>{hover.i}</div>
        </div>
      )}

      {/* COLOR PICKER POPOVER */}
      {picker && (
        <>
          <div
            onClick={() => setPicker(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
            }}
          />
          <div style={{
            position: 'fixed',
            left: Math.min(picker.x, window.innerWidth - 220),
            top: Math.min(picker.y, window.innerHeight - 140),
            background: C.panel,
            border: `1px solid ${C.panelEdge}`,
            borderRadius: 10,
            padding: 12,
            zIndex: 201,
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            width: 200,
          }}>
            <div style={{
              fontSize: 10,
              letterSpacing: '0.8px',
              color: C.textDim,
              marginBottom: 10,
            }}>
              {picker.kind === 'cohort' ? 'COHORT LINK COLOR' : 'INSTITUTION LINK COLOR'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginBottom: 10 }}>
              {[
                '#7ab8e5', '#f29470', '#9bb5d6', '#e8a87c',
                '#a8d8a8', '#d9a8e0', '#e0d4a8', '#8edbd3',
                '#f5d491', '#c97a5c', '#7d9bc1', '#bfa6e0',
              ].map(c => (
                <button
                  key={c}
                  onClick={() => {
                    if (picker.kind === 'cohort') setCohortColor(c);
                    else setInstColor(c);
                    setPicker(null);
                  }}
                  style={{
                    width: 24, height: 24,
                    background: c,
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <input
              type="color"
              value={picker.kind === 'cohort' ? cohortColor : instColor}
              onChange={(e) => {
                if (picker.kind === 'cohort') setCohortColor(e.target.value);
                else setInstColor(e.target.value);
              }}
              style={{
                width: '100%',
                height: 28,
                background: 'transparent',
                border: `1px solid ${C.panelEdge}`,
                borderRadius: 4,
                cursor: 'pointer',
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

function Pill({ label, color, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'inherit',
        fontSize: 12,
        padding: '5px 12px',
        background: active ? C.panel : 'transparent',
        color: active ? C.text : C.textDim,
        border: `1px solid ${active ? color : C.panelEdge}`,
        borderRadius: 14,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        letterSpacing: '0.3px',
        opacity: active ? 1 : 0.7,
        transition: 'all 0.12s',
      }}
    >
      <span style={{
        display: 'inline-block',
        width: 8, height: 8, borderRadius: '50%',
        background: color,
        opacity: active ? 1 : 0.4,
      }} />
      {label}
    </button>
  );
}

function StatRow({ label, value, last }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      padding: '14px 0',
      borderBottom: last ? 'none' : `1px solid ${C.rule}`,
    }}>
      <span style={{
        fontSize: 12,
        letterSpacing: '1.2px',
        color: C.textDim,
        fontWeight: 500,
      }}>{label}</span>
      <span style={{
        fontSize: 28,
        fontWeight: 600,
        fontVariantNumeric: 'tabular-nums',
        color: C.text,
      }}>{value}</span>
    </div>
  );
}

function ToggleRow({ label, color, checked, onChange }) {
  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      padding: '10px 14px',
      background: C.panel,
      border: `1px solid ${C.panelEdge}`,
      borderRadius: 24,
      cursor: 'pointer',
      userSelect: 'none',
    }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: C.text, minWidth: 0 }}>
        <span style={{
          display: 'inline-block',
          width: 10, height: 10, borderRadius: '50%',
          background: color,
          flexShrink: 0,
        }} />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      </span>
      <Switch checked={checked} onChange={onChange} />
    </label>
  );
}

function Switch({ checked, onChange }) {
  return (
    <span
      onClick={(e) => { e.preventDefault(); onChange(!checked); }}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: 36,
        height: 20,
        background: checked ? '#7ab8e5' : '#2a2c33',
        borderRadius: 12,
        transition: 'background 0.15s',
        flexShrink: 0,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ display: 'none' }}
      />
      <span style={{
        position: 'absolute',
        top: 2,
        left: checked ? 18 : 2,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: checked ? '#1a3a5a' : '#5a5c63',
        transition: 'left 0.15s, background 0.15s',
      }} />
    </span>
  );
}
