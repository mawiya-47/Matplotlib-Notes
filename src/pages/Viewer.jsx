import { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { marked } from 'marked';

marked.setOptions({ breaks: false, gfm: true });

function useNotebook() {
  const [cells, setCells] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/notebook.ipynb')
      .then((r) => {
        if (!r.ok) throw new Error('Could not load notebook.ipynb');
        return r.json();
      })
      .then((nb) => setCells(nb.cells || []))
      .catch((e) => setError(e.message));
  }, []);

  return { cells, error };
}

function joinSource(src) {
  if (Array.isArray(src)) return src.join('');
  return src || '';
}

function CodeCell({ cell, index }) {
  const source = joinSource(cell.source);
  const outputs = cell.outputs || [];

  return (
    <div className="rounded-xl overflow-hidden border border-olive-200 bg-olive-950 my-5">
      <div className="flex items-center justify-between px-4 py-2 bg-olive-900 text-olive-400 font-mono text-[11px]">
        <span>In [{index}]</span>
        <span className="text-olive-500">python</span>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono text-olive-100 whitespace-pre">
        <code>{source}</code>
      </pre>
      {outputs.length > 0 && (
        <div className="border-t border-olive-800 bg-olive-950/60">
          {outputs.map((out, i) => (
            <OutputBlock key={i} out={out} />
          ))}
        </div>
      )}
    </div>
  );
}

function OutputBlock({ out }) {
  if (out.output_type === 'stream') {
    return (
      <pre className="px-4 py-3 text-[12px] font-mono text-olive-300 whitespace-pre-wrap">
        {joinSource(out.text)}
      </pre>
    );
  }
  if (out.output_type === 'error') {
    return (
      <pre className="px-4 py-3 text-[12px] font-mono text-red-300 whitespace-pre-wrap">
        {(out.ename || '') + ': ' + (out.evalue || '')}
      </pre>
    );
  }
  const data = out.data || {};
  if (data['image/png']) {
    return (
      <div className="p-4 bg-paper flex justify-center">
        <img
          src={`data:image/png;base64,${data['image/png']}`}
          alt="cell output"
          className="max-w-full rounded-lg border border-olive-200"
          loading="lazy"
        />
      </div>
    );
  }
  if (data['text/plain']) {
    return (
      <pre className="px-4 py-3 text-[12px] font-mono text-olive-300 whitespace-pre-wrap">
        {joinSource(data['text/plain'])}
      </pre>
    );
  }
  return null;
}

function MarkdownCell({ cell }) {
  const html = useMemo(() => marked.parse(joinSource(cell.source)), [cell]);
  return (
    <div
      className="notebook-md my-6 leading-relaxed text-olive-950"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function extractSections(cells) {
  const sections = [];
  cells.forEach((cell, idx) => {
    if (cell.cell_type === 'markdown') {
      const text = joinSource(cell.source);
      const m = text.match(/^#\s+(.+)$/m) || text.match(/^##\s+(.+)$/m);
      if (m && (text.includes('SECTION') || text.includes('BONUS') || idx === 0)) {
        sections.push({ index: idx, title: m[1].replace(/[#📘🎁🏆]/g, '').trim() });
      }
    }
  });
  return sections;
}

export default function Viewer() {
  const { cells, error } = useNotebook();
  const [activeIdx, setActiveIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const containerRef = useRef(null);

  const sections = useMemo(() => (cells ? extractSections(cells) : []), [cells]);

  const scrollTo = (idx) => {
    const el = document.getElementById(`cell-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveIdx(idx);
      setSidebarOpen(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper text-center px-6">
        <div>
          <p className="font-display text-2xl text-olive-950 mb-2">Couldn't load the notebook</p>
          <p className="text-olive-900/60 mb-6">{error}</p>
          <Link to="/" className="text-olive-700 underline">← Back home</Link>
        </div>
      </div>
    );
  }

  let codeCounter = 0;

  return (
    <div className="min-h-screen bg-paper">
      {/* Top bar */}
      <div className="fixed top-0 inset-x-0 z-40 h-16 bg-paper/95 backdrop-blur border-b border-olive-200 flex items-center px-4 md:px-6 gap-4">
        <button
          onClick={() => setSidebarOpen((s) => !s)}
          className="md:hidden px-3 py-2 rounded-lg border border-olive-300 text-olive-800 text-sm"
        >
          ☰
        </button>
        <Link to="/" className="font-display font-semibold text-olive-900 flex items-center gap-2 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-olive-600 inline-block" />
          <span className="hidden sm:inline">plot3d.course</span>
        </Link>
        <div className="flex-1" />
        <a
          href="/data/notebook.ipynb"
          download
          className="px-4 py-2 rounded-full bg-olive-700 text-paper text-sm font-medium hover:bg-olive-800 transition-colors"
        >
          Download .ipynb
        </a>
      </div>

      <div className="flex pt-16 max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-16 md:top-16 h-[calc(100vh-4rem)] w-72 shrink-0 bg-paper border-r border-olive-200 overflow-y-auto transition-transform duration-300 z-30 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-olive-500 mb-4">
              Table of Contents
            </p>
            {!cells && <p className="text-sm text-olive-900/50">Loading notebook…</p>}
            <ul className="space-y-1">
              {sections.map((s) => (
                <li key={s.index}>
                  <button
                    onClick={() => scrollTo(s.index)}
                    className={`text-left w-full text-sm px-3 py-2 rounded-lg transition-colors leading-snug ${
                      activeIdx === s.index
                        ? 'bg-olive-700 text-paper'
                        : 'text-olive-900/70 hover:bg-olive-100'
                    }`}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content */}
        <main ref={containerRef} className="flex-1 min-w-0 px-5 md:px-10 py-10 max-w-3xl">
          {!cells && (
            <div className="py-32 text-center text-olive-900/50 font-mono text-sm">
              Loading 271 cells…
            </div>
          )}
          {cells &&
            cells.map((cell, idx) => {
              if (cell.cell_type === 'markdown') {
                return (
                  <div id={`cell-${idx}`} key={idx}>
                    <MarkdownCell cell={cell} />
                  </div>
                );
              }
              if (cell.cell_type === 'code') {
                codeCounter += 1;
                if (!joinSource(cell.source).trim()) return null;
                return (
                  <div id={`cell-${idx}`} key={idx}>
                    <CodeCell cell={cell} index={codeCounter} />
                  </div>
                );
              }
              return null;
            })}
          {cells && (
            <div className="text-center py-16 border-t border-olive-200 mt-10">
              <p className="text-olive-900/50 text-sm mb-4">You've reached the end of the notebook.</p>
              <Link to="/" className="text-olive-700 font-medium underline">
                ← Back to overview
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
