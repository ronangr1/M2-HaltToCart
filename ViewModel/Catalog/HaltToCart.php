<?php declare(strict_types=1);

namespace Ronangr1\HaltToCart\ViewModel\Catalog;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\View\Element\Block\ArgumentInterface;

class HaltToCart implements ArgumentInterface
{
    private ScopeConfigInterface $config;

    /**
     * @param ScopeConfigInterface $config
     */
    public function __construct(
        ScopeConfigInterface $config
    )
    {
        $this->config = $config;
    }

    public function isEnabled(): bool
    {
        return $this->config->isSetFlag('catalog/frontend/enable_halttocart', ScopeConfigInterface::SCOPE_TYPE_DEFAULT);
    }
}
