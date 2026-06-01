export default function Home() {
  return (
    <main className="w-full max-w-[768px] mx-auto px-margin-mobile pt-lg pb-xl space-y-xl">
      {/* Greeting */}
      <section className="space-y-xs">
        <h2 className="font-display-lg text-display-lg text-on-surface">Hola, Alex</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Tienes 3 tareas urgentes para hoy.</p>
      </section>

      {/* FlowAI Banner */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-container to-surface-container-high p-md border border-outline-variant/30 shadow-[0px_4px_12px_rgba(15,23,42,0.04)] flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity active:scale-[0.98]">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
        <div className="flex items-center gap-md z-10">
          <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined" data-weight="fill">robot_2</span>
          </div>
          <div>
            <h3 className="font-label-md text-label-md text-on-surface">Pregúntale a FlowAI</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Planifiquemos tu día de forma inteligente.</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-secondary z-10">arrow_forward</span>
      </section>

      {/* Prioridades de Hoy */}
      <section className="space-y-md">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-md-mobile text-headline-md-mobile text-on-surface">Prioridades de Hoy</h3>
          <button className="font-label-md text-label-md text-secondary hover:opacity-80 transition-opacity">Ver todas</button>
        </div>
        <div className="space-y-sm">
          {/* Task Card 1 (Urgent) */}
          <div className="bg-[#131b2e] rounded-lg p-md flex gap-md items-start shadow-[0px_4px_12px_rgba(15,23,42,0.04)] border-l-4 border-l-urgent-red relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-urgent-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <button className="mt-1 w-5 h-5 rounded-sm border border-outline-variant flex items-center justify-center text-transparent hover:border-secondary hover:text-secondary transition-colors shrink-0">
              <span className="material-symbols-outlined text-[16px]">check</span>
            </button>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-label-md text-label-md text-on-surface">Revisión de Presupuesto Q3</h4>
                <span className="font-label-sm text-label-sm text-urgent-red flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> 10:00 AM
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">Aprobar las partidas finales con el equipo de finanzas antes de la junta directiva.</p>
            </div>
          </div>

          {/* Task Card 2 */}
          <div className="bg-[#131b2e] rounded-lg p-md flex gap-md items-start shadow-[0px_4px_12px_rgba(15,23,42,0.04)] border-l-4 border-l-secondary relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <button className="mt-1 w-5 h-5 rounded-sm border border-outline-variant flex items-center justify-center text-transparent hover:border-secondary hover:text-secondary transition-colors shrink-0">
              <span className="material-symbols-outlined text-[16px]">check</span>
            </button>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-label-md text-label-md text-on-surface">Feedback Diseño UI</h4>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> 02:30 PM
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">Enviar comentarios sobre los nuevos componentes compartidos al equipo de desarrollo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos Vencimientos */}
      <section className="space-y-md">
        <h3 className="font-headline-md-mobile text-headline-md-mobile text-on-surface">Próximos Vencimientos</h3>
        <div className="flex gap-md overflow-x-auto hide-scrollbar pb-2 snap-x">
          {/* Deadline Card 1 */}
          <div className="bg-[#131b2e] rounded-lg p-md min-w-[200px] shadow-[0px_4px_12px_rgba(15,23,42,0.04)] snap-start shrink-0 border border-outline-variant/20 flex flex-col justify-between h-28">
            <div className="flex items-center gap-sm text-secondary mb-2">
              <span className="material-symbols-outlined text-[18px]">campaign</span>
              <span className="font-label-sm text-label-sm">Marketing</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md text-on-surface truncate">Campaña Q4</h4>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">Mañana</p>
            </div>
          </div>

          {/* Deadline Card 2 */}
          <div className="bg-[#131b2e] rounded-lg p-md min-w-[200px] shadow-[0px_4px_12px_rgba(15,23,42,0.04)] snap-start shrink-0 border border-outline-variant/20 flex flex-col justify-between h-28">
            <div className="flex items-center gap-sm text-tertiary mb-2">
              <span className="material-symbols-outlined text-[18px]">code</span>
              <span className="font-label-sm text-label-sm">Desarrollo</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md text-on-surface truncate">Lanzamiento v2.0</h4>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">Jue, 14 Nov</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
