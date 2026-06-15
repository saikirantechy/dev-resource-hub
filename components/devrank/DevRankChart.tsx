"use client";

import { motion } from "framer-motion";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface Props {
  data: DataPoint[];
  height?: number;
  showLabels?: boolean;
  barColor?: string;
}

export default function DevRankChart({ data, height = 120, showLabels = true, barColor = "from-blue-500 to-purple-500" }: Props) {
  const maxVal = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="space-y-1">
      <div className="flex items-end gap-1" style={{ height }}>
        {data.map((d, i) => {
          const pct = (d.value / maxVal) * 100;
          return (
            <motion.div
              key={d.label}
              initial={{ height: 0 }}
              animate={{ height: `${pct}%` }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className="flex-1 rounded-t-md relative group cursor-pointer"
              style={{ background: d.color ? `linear-gradient(135deg, ${d.color}88, ${d.color}44)` : undefined }}
            >
              <div className={`w-full h-full rounded-t-md bg-gradient-to-t ${d.color ? "" : barColor} opacity-80 group-hover:opacity-100 transition-opacity`} />
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[8px] font-bold px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10">
                {d.label}: {d.value.toLocaleString()}
              </div>
            </motion.div>
          );
        })}
      </div>
      {showLabels && (
        <div className="flex gap-1">
          {data.map(d => (
            <div key={d.label} className="flex-1 text-center text-[7px] text-gray-600 font-bold uppercase tracking-wider truncate">
              {d.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
