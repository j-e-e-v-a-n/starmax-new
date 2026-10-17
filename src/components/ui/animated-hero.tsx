import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  eyebrowText?: string;
  prefixText?: string;
  titles?: string[];
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onEyebrowClick?: () => void;
}

function Hero({
  eyebrowText = "Read our launch article",
  prefixText = "This is something",
  titles: customTitles,
  description = "Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.",
  primaryButtonText = "Sign up here",
  secondaryButtonText = "Jump on a call",
  onPrimaryClick,
  onSecondaryClick,
  onEyebrowClick,
}: HeroProps = {}) {
  const [titleNumber, setTitleNumber] = useState(0);
  const defaultTitles = useMemo(
    () => ["amazing", "new", "wonderful", "beautiful", "smart"],
    []
  );
  const titles = customTitles && customTitles.length > 0 ? customTitles : defaultTitles;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex gap-8 py-16 sm:py-20 lg:py-28 items-center justify-center flex-col">
          <div>
            <Button
              variant="secondary"
              size="sm"
              className="gap-4 font-semibold text-xs sm:text-sm bg-sky-50 text-[#0b63d6] hover:bg-sky-100 border border-sky-100/80 cursor-pointer shadow-xs"
              onClick={onEyebrowClick}
            >
              {eyebrowText} <MoveRight className="w-4 h-4 text-[#0b63d6]" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl max-w-3xl tracking-tighter text-center font-normal text-[#10264D]">
              <span className="text-spektr-cyan-50 font-normal">{prefixText}</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 min-h-[1.25em]">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold text-[#0b63d6]"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-slate-600 max-w-2xl text-center">
              {description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Button
              size="lg"
              className="gap-4 w-full sm:w-auto font-semibold border-slate-300 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer shadow-xs"
              variant="outline"
              onClick={onSecondaryClick}
            >
              {secondaryButtonText} <PhoneCall className="w-4 h-4 text-[#0b63d6]" />
            </Button>
            <Button
              size="lg"
              className="gap-4 w-full sm:w-auto font-bold bg-[#0b63d6] hover:bg-[#0754b8] text-white cursor-pointer shadow-md"
              onClick={onPrimaryClick}
            >
              {primaryButtonText} <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
