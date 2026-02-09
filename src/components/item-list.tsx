import {
  IconArrowDown,
  IconArrowUp,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { clsx } from "clsx";

type ItemListProps<T> = {
  items: T[];
  icon?: React.ReactNode;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onMove?: (fromIndex: number, toIndex: number) => void;
  addButtonText: string;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
};

export default function ItemList<T>({
  items,
  onAdd,
  onRemove,
  onMove,
  addButtonText,
  renderItem,
  className,
  icon,
}: ItemListProps<T>) {
  return (
    <div className={clsx(className, "flex gap-4")}>
      {icon}
      <div className="flex flex-col gap-4 grow">
        {items.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key Last resort, using index as key since items can be duplicated and don't have unique IDs
          <div key={index} className="flex items-center gap-4">
            {renderItem(item, index)}
            <div className="flex flex-col gap-1">
              {onMove && (
                <>
                  <button
                    type="button"
                    onClick={() => onMove(index, index - 1)}
                    disabled={index === 0}
                    className="transition-colors disabled:opacity-30"
                    title="Move up"
                  >
                    <IconArrowUp className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onMove(index, index + 1)}
                    disabled={index === items.length - 1}
                    className="transition-colors disabled:opacity-30"
                    title="Move down"
                  >
                    <IconArrowDown className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                  </button>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="transition-colors"
              title={`Remove ${addButtonText.toLowerCase()}`}
            >
              <IconTrash className="w-5 h-5 text-red-500 hover:text-red-700" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={onAdd}
          className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-(--primary) transition-colors"
        >
          <IconPlus />
          <span>{addButtonText}</span>
        </button>
      </div>
    </div>
  );
}
