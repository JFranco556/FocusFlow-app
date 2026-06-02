"use client";

import { useEffect, useRef } from "react";

export default function NotificationManager() {
  const notifiedItems = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Pedir permisos de notificación
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    const checkSchedule = async () => {
      if ("Notification" in window && Notification.permission === "granted") {
        try {
          const res = await fetch("/api/schedule/today");
          const data = await res.json();
          if (!data.items) return;

          const now = new Date();
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();

          data.items.forEach((item: any) => {
            const [startH, startM] = item.startTime.split(':').map(Number);
            
            // Convertir a minutos totales desde las 00:00 para comparar
            const nowTotalMins = currentHour * 60 + currentMinute;
            const startTotalMins = startH * 60 + startM;

            const diffMins = startTotalMins - nowTotalMins;

            // Si faltan exactamente 15 minutos (o entre 14 y 16 por posibles retrasos del intervalo)
            if (diffMins >= 14 && diffMins <= 16 && !notifiedItems.current.has(item._id)) {
              new Notification("¡Clase a punto de empezar!", {
                body: `Tu clase de "${item.title}" empieza en 15 minutos a las ${item.startTime}.`,
                icon: "/favicon.ico"
              });
              notifiedItems.current.add(item._id); // Evitar spam
            }
            
            // Limpiar caché al día siguiente
            if (diffMins < 0 && notifiedItems.current.has(item._id)) {
                // Ya pasó, lo dejamos así. Se reseteará si el componente se recarga.
            }
          });
        } catch (error) {
          console.error("Error comprobando notificaciones", error);
        }
      }
    };

    // Revisar inmediatamente al cargar
    checkSchedule();

    // Luego revisar cada minuto (60000 ms)
    const interval = setInterval(checkSchedule, 60000);
    return () => clearInterval(interval);
  }, []);

  return null; // Este componente es invisible
}
