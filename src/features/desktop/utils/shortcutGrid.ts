import type { DesktopPosition } from '@/stores/desktopModels';

const DESKTOP_GRID_ORIGIN = { x: 28, y: 28 } as const;
const DESKTOP_GRID_STEP = { x: 110, y: 124 } as const;
const DESKTOP_SHORTCUT_BOUNDS = { x: 140, y: 180 } as const;

type Viewport = {
  width: number;
  height: number;
};

type GridBounds = {
  maxColumn: number;
  maxRow: number;
};

type GridCell = {
  column: number;
  row: number;
};

function getDefaultViewport(): Viewport {
  if (typeof window === 'undefined') {
    return { width: 1440, height: 900 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function clampGridIndex(index: number, maxIndex: number) {
  return Math.max(0, Math.min(index, maxIndex));
}

function getGridBounds(viewport: Viewport): GridBounds {
  return {
    maxColumn: Math.max(
      0,
      Math.floor(
        (viewport.width - DESKTOP_SHORTCUT_BOUNDS.x - DESKTOP_GRID_ORIGIN.x) /
          DESKTOP_GRID_STEP.x
      )
    ),
    maxRow: Math.max(
      0,
      Math.floor(
        (viewport.height - DESKTOP_SHORTCUT_BOUNDS.y - DESKTOP_GRID_ORIGIN.y) /
          DESKTOP_GRID_STEP.y
      )
    ),
  };
}

function positionToGridCell(
  position: DesktopPosition,
  bounds: GridBounds
): GridCell {
  return {
    column: clampGridIndex(
      Math.round((position.x - DESKTOP_GRID_ORIGIN.x) / DESKTOP_GRID_STEP.x),
      bounds.maxColumn
    ),
    row: clampGridIndex(
      Math.round((position.y - DESKTOP_GRID_ORIGIN.y) / DESKTOP_GRID_STEP.y),
      bounds.maxRow
    ),
  };
}

function gridCellToPosition(cell: GridCell): DesktopPosition {
  return {
    x: DESKTOP_GRID_ORIGIN.x + cell.column * DESKTOP_GRID_STEP.x,
    y: DESKTOP_GRID_ORIGIN.y + cell.row * DESKTOP_GRID_STEP.y,
  };
}

function getGridCellKey(cell: GridCell) {
  return `${cell.column}:${cell.row}`;
}

export function snapDesktopShortcutPosition(
  position: DesktopPosition,
  viewport: Viewport = getDefaultViewport()
) {
  return gridCellToPosition(
    positionToGridCell(position, getGridBounds(viewport))
  );
}

export function resolveDesktopShortcutPosition(
  position: DesktopPosition,
  occupiedPositions: DesktopPosition[],
  viewport: Viewport = getDefaultViewport()
) {
  const bounds = getGridBounds(viewport);
  const preferredCell = positionToGridCell(position, bounds);
  const occupiedKeys = new Set(
    occupiedPositions.map((entry) =>
      getGridCellKey(positionToGridCell(entry, bounds))
    )
  );

  if (!occupiedKeys.has(getGridCellKey(preferredCell))) {
    return gridCellToPosition(preferredCell);
  }

  let bestCell: GridCell | null = null;
  let bestManhattan = Number.POSITIVE_INFINITY;
  let bestEuclidean = Number.POSITIVE_INFINITY;

  for (let row = 0; row <= bounds.maxRow; row += 1) {
    for (let column = 0; column <= bounds.maxColumn; column += 1) {
      const candidate = { column, row };
      if (occupiedKeys.has(getGridCellKey(candidate))) continue;

      const dx = column - preferredCell.column;
      const dy = row - preferredCell.row;
      const manhattan = Math.abs(dx) + Math.abs(dy);
      const euclidean = dx * dx + dy * dy;

      if (
        bestCell === null ||
        manhattan < bestManhattan ||
        (manhattan === bestManhattan && euclidean < bestEuclidean) ||
        (manhattan === bestManhattan &&
          euclidean === bestEuclidean &&
          (row < bestCell.row ||
            (row === bestCell.row && column < bestCell.column)))
      ) {
        bestCell = candidate;
        bestManhattan = manhattan;
        bestEuclidean = euclidean;
      }
    }
  }

  return bestCell
    ? gridCellToPosition(bestCell)
    : gridCellToPosition(preferredCell);
}
