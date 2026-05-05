import React from 'react';

interface ProcessFlowProps {
  steps: string[];
  title?: string;
  vertical?: boolean;
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ 
  steps, 
  title, 
  vertical = false 
}) => {
  return (
    <div className="my-8">
      {title && (
        <h4 className="font-semibold text-xl text-hd-secondary mb-6">{title}</h4>
      )}
      
      <div className={`flex ${vertical ? 'flex-col' : 'flex-wrap md:flex-nowrap'} gap-4 md:gap-2`}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Container */}
            <div className={`flex-1 ${vertical ? 'mb-4' : ''}`}>
              <div className="flex items-start">
                {/* Step Number Circle */}
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-hd-primary text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                
                {/* Step Content */}
                <div className="ml-4 flex-1">
                  <p className="text-sm md:text-base font-medium text-hd-secondary">
                    {step}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Arrow/Connector - Hidden on last step */}
            {index < steps.length - 1 && (
              <div className={`flex items-center justify-center ${vertical ? 'my-2 ml-5' : 'hidden md:flex'}`}>
                {vertical ? (
                  <div className="w-0.5 h-8 bg-gradient-to-b from-hd-primary/50 to-hd-primary/20"></div>
                ) : (
                  <i className="fas fa-arrow-right text-hd-primary/50 mx-2"></i>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProcessFlow;
