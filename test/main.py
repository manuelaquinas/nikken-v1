from datetime import datetime

import subprocess
import sys
import os

cd = os.path.dirname(os.path.abspath(__file__))

def main(iterations, results_path):
    nikken_id = 1000
    for index in range(iterations):
        print(f'Executing test {index}')
        test_path = results_path + f'/{str(index + 1)}'
        os.mkdir(test_path)
        processes = []
        with open(results_path + '/log.txt', 'a+', encoding='utf-8') as log_file:
            processes.append(subprocess.Popen(['robot', '--variable', f'NIKKEN_ID:{str(nikken_id)}', cd + '/nikken_rpa.robot'], stdout=log_file, stderr=log_file, cwd=test_path))
        # process.wait()
        nikken_id += 1
    for process in processes:
        process.wait()

if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(1)
    if not os.path.exists(cd + '/results'):
        os.mkdir(cd + '/results')
    current_date = datetime.now()
    results_path = cd + '/results/' + current_date.strftime("%Y_%d_%m %H_%M_%S")
    os.mkdir(results_path)
    main(int(sys.argv[1]), results_path)
