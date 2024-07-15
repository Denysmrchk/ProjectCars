import { CustomBulletChart } from '@/components/charts/CustomBulletChart';

export const Condition = ({ body, technical }: { body: number; technical: number }) => {
  return (
    <>
      <p>Condition:</p>
      <CustomBulletChart title="Body" width={body} />
      <CustomBulletChart title="Technical" width={technical} />
    </>
  );
};

export const ParameterLine = ({
  name,
  value,
  prefixValue,
}: {
  name: string;
  value: number | string | undefined;
  prefixValue?: string;
}) => {
  return (
    <div className="w-full flex justify-between">
      <p>{name}</p>
      <div className="border-b-[2px] border-dotted dark:border-gray-300 border-black-darkest flex-1 mx-2 my-[5px]"></div>
      <p>
        {value} {prefixValue}
      </p>
    </div>
  );
};
